import axios from 'axios';

const BASE_URL = 'http://***REMOVED***:30080/api';
const API_HEADER = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

function panic(str) {
    console.log(str);
    undefined_function_that_will_crash();
}

function route(route) {
    return `${BASE_URL}${route}`;
}

function map_to_content(response) {
    return response.data.content;
}

async function make_request(route) {
    return axios(route, API_HEADER);
}
export async function resources() {
    return make_request(route('/resources')).then(map_to_content);
}

export async function policies() {
    return make_request(route('/policies')).then(map_to_content);
}

export async function runs() {
    return make_request(route('/runs')).then(map_to_content);
}

export async function results() {
    return make_request(route('/results')).then(map_to_content);
}

export async function gcp_scan() {
    return make_request(route('/gcp/scan'));
}

export async function gcp_reload() {
    return make_request(route('/gcp/reload'));
}

export async function gcp_constraints() {
    return make_request(route('/gcp/constraints')).then(map_to_content);
}

export async function gcp_reload_constraints() {
    return make_request(route('/gcp/reload_constraints'));
}

export async function gcp_refresh() {
    return Promise.all([gcp_reload_constraints(), gcp_reload()]).then(gcp_scan);
}

export async function azure_constraints() {
    return make_request(route('/azure/policies')).then(map_to_content);
}

export async function azure_reload_policies() {
    return make_request(route('/azure/reload_policies'));
}

export async function azure_scan() {
    return make_request(route('/azure/scan'));
}

export async function azure_reload() {
    return make_request(route('/azure/reload'));
}

export async function azure_refresh() {
    return Promise.all([azure_reload(), azure_reload_policies()]).then(azure_scan);
}

export function policies_by_cloud(policies, cloud) {
    return policies.filter((policy) => policy.cloud === cloud);
}
export function policy_by_uid(policies, uid) {
    return policies.find((policy) => policy.uid === uid);
}

export function resource_by_id(resources, id) {
    return resources.find((resource) => resource.id === id);
}

export function runs_by_id(runs, id) {
    return runs.find((run) => run.id === id);
}

export function join_result_table(results, runs, resources, policies) {
    return results.map((result) => {
        let run = runs_by_id(runs, result.run_id) || panic(`Run with id ${result.run_id} not found`);
        let resource = resource_by_id(resources, result.resource_id) || panic(`Resource with id ${results.resource_id} not found`);
        let policy = policy_by_uid(policies, result.policy_id) || panic(`Policy with id ${results.policy_id} not found`);

        resource = {
            raw: JSON.parse(resource.raw_json_resource),
            ...resource
        };

        policy = {
            raw: JSON.parse(policy.raw_json_policy),
            ...policy
        };

        return {
            run: run,
            resource: resource,
            policy: policy,
            enforced: result.enforced
        };
    });
}

export async function complete_result() {
    return Promise.all([results(), runs(), resources(), policies()]).then((values) => join_result_table(...values));
}
