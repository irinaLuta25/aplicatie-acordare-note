

const calculateDivisors = (totalNumberOfStudents) => {
    let nrd = 0;
    for (let d = 1; d < totalNumberOfStudents; d++) {
        if (totalNumberOfStudents % d == 0) {
            nrd++;
        }
    }
    return nrd;
}

const getAllDivisors = (totalNumberOfStudents) => {
    let nrd = 0;
    let array = [];
    for (let d = 1; d < totalNumberOfStudents; d++) {
        if (totalNumberOfStudents % d == 0) {
            array[nrd] = d;
            nrd++;
        }
    }
    return array;
}

const calculateNumberOfTeams = (totalNumberOfStudents) => {
    let numberOfTeams = 0;
    if (calculateDivisors(totalNumberOfStudents) == 2) { // nr e prim
        totalNumberOfStudents++;
    }
    let nrd = calculateDivisors(totalNumberOfStudents);
    let array = getAllDivisors(totalNumberOfStudents);
    let middlePoz = Math.ceil(nrd / 2);
    numberOfTeams = array[middlePoz];

    return numberOfTeams;
}


module.exports={calculateNumberOfTeams};