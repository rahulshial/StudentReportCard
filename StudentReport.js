const { readCourses, readStudents, readMarks, readTests, writeJSON } = require ('./processIO');

const args = process.argv.slice(2);
const coursesFile = args[0];
const studentsFile = args[1];
const testsFIle = args[2];
const marksFile = args[3];
const outputFile = args[4];

let students, courses, tests, marks;
const JSONObject = {
  students: []
};

const fetchStudentRecords = async() => {
  courses = await readCourses(coursesFile);
  students = await readStudents(studentsFile);
  tests = await readTests(testsFIle);
  marks = await readMarks(marksFile);
};

const calculateAvgScore = (student) => {
  const returnObject = {
    id: Number(student.id),
    name: student.name,
    totalAverage: 0,
    courses: []
  };

  const studentMarks = marks.filter(function(mark) {
    return mark.student_id === student.id;
  });
  
  let courseObject={};
  let count = 0;
  let totalAverage = 0;
  let weightedAverage = 0;

  for (const mark of studentMarks) {
    const scoreWeight = tests.filter(function(test) {
      return test.id === mark.test_id;
    });

    if(!courseObject[scoreWeight[0].course_id]) {
      const course = courses.filter(function(course) {
        return course.id === scoreWeight[0].course_id;
      });
      count +=1;
      weightedAverage = mark.mark * scoreWeight[0].weight / 100;
      courseObject[scoreWeight[0].course_id] = {
        id: Number(scoreWeight[0].course_id),
        name: course[0].name,
        teacher: course[0].teacher,
        courseAverage: weightedAverage
      };
      totalAverage += weightedAverage;
    } else {
      const weightedAverage = mark.mark * scoreWeight[0].weight / 100;
      courseObject[scoreWeight[0].course_id]['courseAverage'] += weightedAverage;
      totalAverage += weightedAverage
    };
  };

  for (const record in courseObject) {
    returnObject.courses.push(courseObject[record]);
  }
  returnObject.totalAverage = totalAverage / count;
  JSONObject.students.push(returnObject)
};

const createStudentRecords = async() => {
  if(args.length < 5 || args.length >= 6) {
    console.log('Please provide 4 input and 1 output file names!!!')
    return
  } else {
    await fetchStudentRecords();
    for(const student of students) {
      calculateAvgScore(student);
    };
    writeJSON(outputFile, JSON.stringify(JSONObject));
    console.log ('Report Card Generated, please see output file: ', outputFile);
    return;
  }
};

createStudentRecords();