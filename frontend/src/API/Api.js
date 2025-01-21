import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";

export async function getAssignments(){
    return await axios.get("assignment/getAll",{"Content-Type":"application/json"});
}

export async function getAllEvaluationsByAssignments(){
    return await axios.get("assignment/getAllEvaluationsByAssignments",{"Content-Type":"application/json"});
}

export async function getAllAssignmentsByPhases(){
    return await axios.get("assignment/getAllAssignmentsByPhases",{"Content-Type":"application/json"});
}

export async function createEvaluation(evaluation){
    return await axios.post("evaluation/create",evaluation,{"Content-Type":"application/json"});
}

export async function getAllAssignmentsByUserId(id){
    return await axios.get(`assignment/getAllAssignmentsByUserId/${id}`,{"Content-Type":"application/json"});
}

export async function createAssignment(assignment){
    return await axios.post(`assignment/create`,assignment,{"Content-Type":"application/json"});
}

export async function createPhase(phase){
    return await axios.post(`phase/create`,phase,{"Content-Type":"application/json"});
}