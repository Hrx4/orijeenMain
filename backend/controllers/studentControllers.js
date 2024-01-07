const asyncHandler = require("express-async-handler");
const studentModels = require("../models/studentModels");
const paymentModels = require("../models/paymentModels");
const subjectModels = require("../models/subjectModels");

const createStudent = asyncHandler(async (req, res) => {
  const {
    studentEnrollment,
    studentName,
    studentClass,
    studentBatch,
    studentCourse,
    studentSubjects,
    studentPhone,
    studentAddress,
    studentPaymentType,
    studentFee,
    studentBlood,
    studentPhoto,
    studentPassword,
    studentCategory,
    admissionAmount,
    guardianName,
    createdMonth,
    createdYear,
  } = req.body;
  console.log(studentPassword);

  const student = await studentModels.create({
    studentEnrollment: studentEnrollment,
    studentName: studentName,
    studentClass: studentClass,
    studentBatch: studentBatch,
    studentCourse: studentCourse,
    studentSubjects: studentSubjects,
    studentPhone: studentPhone,
    studentAddress: studentAddress,
    studentPaymentType: studentPaymentType,
    studentFee : studentFee,
    studentPhoto : studentPhoto,
    studentPassword: studentPassword,
    studentBlood : studentBlood,
    studentCategory : studentCategory,
    guardianName: guardianName,
    admissionAmount : admissionAmount,
    createdMonth : createdMonth,
    createdYear: createdYear,
  });


  const d = new Date();
  const payment = 
  await paymentModels.create({
    paymentId: studentEnrollment,
    studentCourse: studentCourse,
    studentSubjects: studentSubjects,
    studentClass: studentClass,
    paymentMoney: studentFee,
    paymentType: studentPaymentType,
    studentName: studentName,
    totalIncome: Number(studentFee) + Number(admissionAmount),
    lastIncomeMonth: d.getMonth(),
    lastIncomeMoney: studentFee,
    lastIncomeDate: d.toISOString().split("T")[0],
    paymentDetails: [
      {
        paymentMonth: d.getMonth(),
        paymentMoney: studentFee,
        paymentType: studentPaymentType,
        paymentDate: d.toISOString().split("T")[0],
        paidMonth: d.getMonth(),
        paidYear: d.getFullYear(),
        paymentYear: d.getFullYear(),
      },
    ],
  });

  res.status(200).json(student);
});

const getStudent = asyncHandler(async (req, res) => {
  const { studentCourse } = req.body;

  let students = await studentModels.find();
  students = students.filter((item) => {
    return item.studentCourse.some((elem) => elem === studentCourse);
  });  res.status(200).json(students);
});
const getStudentPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;

  const payment = await paymentModels.find({ paymentId: paymentId });
  res.status(200).json(payment);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await studentModels.findById(req.params.id);
  console.log(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("student not found");
  }

  await studentModels.deleteOne({ _id: req.params.id });
  res.status(200).json(student);
});

const updateStudent = asyncHandler(async (req, res) => {
  const {
    studentEnrollment,
    studentName,
    studentClass,
    studentBatch,
    studentCourse,
    studentSubjects,
    studentPhone,
    studentPhoto,
    studentPassword,
    studentAddress,
    studentPaymentType,
    studentFee,
    studentBlood,
    studentCategory,
    guardianName,
  } = req.body;

  const student = await studentModels.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("student not found");
  }

  const updatedStudent = await studentModels.findByIdAndUpdate(req.params.id, {
    studentEnrollment: studentEnrollment,
    studentName: studentName,
    studentClass: studentClass,
    studentBatch: studentBatch,
    studentCourse: studentCourse,
    studentSubjects: studentSubjects,
    studentPhoto : studentPhoto,
    studentPassword : studentPassword,
    studentPhone: studentPhone,
    studentAddress: studentAddress,
    studentPaymentType: studentPaymentType,
    studentFee : studentFee,
    studentBlood : studentBlood,
    studentCategory : studentCategory,
    guardianName: guardianName,
    
  });

  res.status(201).json(student);
});

const updatePayment = asyncHandler(async (req, res) => {
  const student = await paymentModels.find({ paymentId: req.params.id });
  const { paymentMonth, paymentYear } = req.body;
  const {
    paymentId,
    studentCourse,
    studentSubjects,
    paymentDetails,
    paymentType,
    lastIncomeMonth,
    lastIncomeDate,
    lastIncomeMoney,
    paymentMoney,
    totalIncome,
  } = student[0];
  console.log("====================================");
  console.log(paymentDetails);
  console.log("====================================");

  var totalFee = paymentMoney;
  var varTotalIncome = totalIncome;
  var lastPaymentMoney = 0;
  

  const d = new Date();
  var paymentMonthArray = [];
  await paymentMonth.map((item, index) => {
    paymentMonthArray = [
      ...paymentMonthArray,
      {
        paymentMonth: item,
        paymentYear: paymentYear,
        paidMonth: d.getMonth(),
        paidYear: d.getFullYear(),
        paymentMoney: totalFee,
        paymentType: paymentType,
        paymentDate:  d.toISOString().split("T")[0],
      },
    ];
  });

  lastPaymentMoney = totalFee * paymentMonth.length;
  varTotalIncome += lastPaymentMoney;
  console.log("====================================");
  console.log(varTotalIncome, lastIncomeMonth);
  console.log("====================================");
  if (lastIncomeMonth === d.getMonth()) lastPaymentMoney += lastIncomeMoney;

  const updatedPayment = await paymentModels.findOneAndUpdate(
    { paymentId: req.params.id },
    {
      // paymentId: paymentId,
      // studentCourse: studentCourse,
      // studentSubjects: studentSubjects,
      // paymentMoney:totalFee,
      lastIncomeMoney: lastPaymentMoney,
      lastIncomeDate: d.toISOString().split("T")[0],
      totalIncome: varTotalIncome,
      lastIncomeMonth: d.getMonth(),
      paymentDetails: paymentDetails.concat(paymentMonthArray),
    }
  );
  res.status(201).json(updatedPayment);
});

const getMonthlyIncome = asyncHandler(async (req, res) => {
  var totalIncome = 0,
    monthlyIncome = 0,
    monthlyDue=0,
    totalDue=0;
  const d = new Date();

  const payments = await paymentModels.find();
  payments.map((item, index) => {
    if (d.getMonth() === item.lastIncomeMonth)
      monthlyIncome += item.lastIncomeMoney;
      if (d.getMonth() -item.lastIncomeMonth === 1)
      monthlyDue+=item.lastIncomeMoney
      if (d.getMonth() > item.lastIncomeMonth )
      totalDue+=((d.getMonth() - item.lastIncomeMonth) * item.lastIncomeMoney)

    totalIncome += item.totalIncome;
  });

  res.status(200).json({
    monthlyIncome: monthlyIncome,
    monthlyDue:monthlyDue,
    totalIncome: totalIncome,
    totalDue:totalDue,
    totalStudent: payments.length,
    
  });
});

const getMonthlyIncomeDetails = asyncHandler(async (req, res) => {
  const { studentCourse, studentClass, studentSubject, studentEnrollment } =
    req.body;
  const d = new Date();

  var students = await paymentModels.find({});
  console.log("====================================");
  console.log(students, "285");
  console.log("====================================");
  students = students.filter((item) => item.lastIncomeMonth === d.getMonth());

  if (studentEnrollment !== "") {
    students = students.filter((item) => item.paymentId === studentEnrollment);
    
  }

  if (studentCourse !== "") {
    students = students.filter((item) => {
      return item.studentCourse.some((elem) => elem === studentCourse);
    });  }
  if (studentClass !== "")
    students = students.filter((item) => item.studentClass === studentClass);

  if (studentSubject !== "") {
    students = students.filter((item) => {
      return item.studentSubjects.some((elem) => elem === studentSubject);
    });
    
  }

  res.status(200).json(students);
});

const getTotalIncomeDetails = asyncHandler(async (req, res) => {
  const { studentCourse, studentClass, studentSubject, studentEnrollment } =
    req.body;
  const d = new Date();

  var students = await paymentModels.find({});
  
  if (studentEnrollment !== "") {
    students = students.filter((item) => item.paymentId === studentEnrollment);
    
  }

  if (studentCourse !== "") {
    students = students.filter((item) => {
      return item.studentCourse.some((elem) => elem === studentCourse);
    });
  }
  if (studentClass !== "")
    students = students.filter((item) => item.studentClass === studentClass);

  if (studentSubject !== "") {
    students = students.filter((item) => {
      return item.studentSubjects.some((elem) => elem === studentSubject);
    });
    
  }

  res.status(200).json(students);
});

const getMonthlyDueDetails = asyncHandler(async (req, res) => {
  const { studentCourse, studentClass, studentSubject, studentEnrollment } =
    req.body;
  const d = new Date();
  let students = await paymentModels.find({});
  console.log("====================================");
  console.log(students, "285");
  console.log("====================================");
  students = students.filter((item) =>  d.getMonth() - item.lastIncomeMonth===1);

  if (studentEnrollment !== "") {
    students = students.filter((item) => item.paymentId === studentEnrollment);
    
  }

  if (studentCourse !== "") {
    students = students.filter((item) => {
      return item.studentCourse.some((elem) => elem === studentCourse);
    });
    }
  if (studentClass !== "")
    students = students.filter((item) => item.studentClass === studentClass);

  if (studentSubject !== "") {
    students = students.filter((item) => {
      return item.studentSubjects.some((elem) => elem === studentSubject);
    });
    
  }

  res.status(200).json(students);
});

const getTotalDueDetails = asyncHandler(async (req, res) => {
  const { studentCourse, studentClass, studentSubject, studentEnrollment } =
    req.body;
  const d = new Date();

  var students = await paymentModels.find({});

  students = students.filter((item) =>  d.getMonth() > item.lastIncomeMonth);

  
  if (studentEnrollment !== "") {
    students = students.filter((item) => item.paymentId === studentEnrollment);
    
  }

  if (studentCourse !== "") {
    students = students.filter((item) => {
      return item.studentCourse.some((elem) => elem === studentCourse);
    });
    }
  if (studentClass !== "")
    students = students.filter((item) => item.studentClass === studentClass);

  if (studentSubject !== "") {
    students = students.filter((item) => {
      return item.studentSubjects.some((elem) => elem === studentSubject);
    });
    
  }

  res.status(200).json(students);
});

module.exports = {
  createStudent,
  getStudent,
  deleteStudent,
  updateStudent,
  updatePayment,
  getStudentPayment,
  getMonthlyIncome,
  getMonthlyIncomeDetails,
  getTotalIncomeDetails,
  getMonthlyDueDetails,
  getTotalDueDetails
};
