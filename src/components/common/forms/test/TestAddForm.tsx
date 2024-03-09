// import React, { useState } from 'react';
// import { TextField, Button, IconButton, Box } from '@mui/material';
// import { Add, Delete } from '@mui/icons-material';
// import useTestStore from '@store/testStore';
// import useAuthStore from '@store/authStore';

// interface Question {
//   question: string;
//   options: string[];
//   points: number[];
// }

// interface FormData {
//   title: string;
//   subtitle: string;
//   description: string;
//   isApproved: boolean;
//   createdAt: Date;
//   image: string;
//   userId: number;
//   questions: Question[];
// }

// const TestAddForm = ({ callBack }: any) => {
//   const addTest = useTestStore((state) => state.addTest);
//   const user = useAuthStore((state) => state.user);

//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     subtitle: '',
//     description: '',
//     isApproved: false,
//     createdAt: new Date(),
//     image: '',
//     userId: user.id,
//     questions: [],
//   });

//   const handleQuestionChange = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevState: any) => {
//       const updatedQuestions = [...prevState.questions];
//       updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
//       return { ...prevState, questions: updatedQuestions };
//     });
//   };

//   const handleOptionChange = (
//     questionIndex: number,
//     optionIndex: number,
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { value } = e.target;
//     setFormData((prevState: any) => {
//       const updatedQuestions = [...prevState.questions];
//       const updatedOptions = [...updatedQuestions[questionIndex].options];
//       updatedOptions[optionIndex] = value;
//       updatedQuestions[questionIndex] = {
//         ...updatedQuestions[questionIndex],
//         options: updatedOptions,
//       };
//       return { ...prevState, questions: updatedQuestions };
//     });
//   };

//   const handlePointsChange = (
//     questionIndex: number,
//     optionIndex: number,
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { value } = e.target;
//     setFormData((prevState: any) => {
//       const updatedQuestions = [...prevState.questions];
//       const updatedPoints = [...updatedQuestions[questionIndex].points];
//       updatedPoints[optionIndex] = parseInt(value);
//       updatedQuestions[questionIndex] = {
//         ...updatedQuestions[questionIndex],
//         points: updatedPoints,
//       };
//       return { ...prevState, questions: updatedQuestions };
//     });
//   };

//   const handleAddQuestion = () => {
//     setFormData((prevState: any) => ({
//       ...prevState,
//       questions: [
//         ...prevState.questions,
//         {
//           question: '',
//           options: [''],
//           points: [0],
//         },
//       ],
//     }));
//   };

//   const handleRemoveQuestion = (index: number) => {
//     setFormData((prevState: any) => ({
//       ...prevState,
//       questions: prevState.questions.filter((_: any, i: any) => i !== index),
//     }));
//   };

//   const handleAddOption = (index: number) => {
//     setFormData((prevState: any) => {
//       const updatedQuestions = [...prevState.questions];
//       updatedQuestions[index].options.push('');
//       updatedQuestions[index].points.push(0);
//       return { ...prevState, questions: updatedQuestions };
//     });
//   };

//   const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
//     setFormData((prevState: any) => {
//       const updatedQuestions = [...prevState.questions];
//       updatedQuestions[questionIndex].options.splice(optionIndex, 1);
//       updatedQuestions[questionIndex].points.splice(optionIndex, 1);
//       return { ...prevState, questions: updatedQuestions };
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await addTest(formData).then(() => {
//       callBack();
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         name="title"
//         label="Заголовок"
//         variant="standard"
//         value={formData.title}
//         onChange={(e) => setFormData((prevState) => ({ ...prevState, title: e.target.value }))}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         name="subtitle"
//         label="Подзаголовок"
//         variant="standard"
//         value={formData.subtitle}
//         onChange={(e) => setFormData((prevState) => ({ ...prevState, subtitle: e.target.value }))}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         name="description"
//         label="Содержание"
//         variant="standard"
//         value={formData.description}
//         onChange={(e) =>
//           setFormData((prevState) => ({ ...prevState, description: e.target.value }))
//         }
//         fullWidth
//         multiline
//         rows={4}
//         margin="normal"
//       />
//       {formData.questions.map((question, questionIndex) => (
//         <Box key={questionIndex} marginBottom={2}>
//           <TextField
//             name={`question-${questionIndex}`}
//             label={`Вопрос ${questionIndex + 1}`}
//             variant="standard"
//             value={question.question}
//             onChange={(e) => handleQuestionChange(questionIndex, e)}
//             fullWidth
//             margin="normal"
//           />
//           {question.options.map((option: any, optionIndex: any) => (
//             <Box key={optionIndex} display="flex" alignItems="center" marginBottom={1}>
//               <TextField
//                 label={`Вариант ответа ${optionIndex + 1}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
//                 variant="outlined"
//                 size="small"
//               />
//               <TextField
//                 label="Баллы"
//                 value={question.points[optionIndex]}
//                 onChange={(e) => handlePointsChange(questionIndex, optionIndex, e)}
//                 type="number"
//                 variant="outlined"
//                 size="small"
//               />
//               <IconButton
//                 onClick={() => handleRemoveOption(questionIndex, optionIndex)}
//                 size="small"
//               >
//                 <Delete />
//               </IconButton>
//             </Box>
//           ))}
//           <Button onClick={() => handleAddOption(questionIndex)} startIcon={<Add />} size="small">
//             Добавить вариант ответа
//           </Button>
//           <IconButton onClick={() => handleRemoveQuestion(questionIndex)} size="small">
//             <Delete />
//           </IconButton>
//         </Box>
//       ))}
//       <Button
//         onClick={handleAddQuestion}
//         startIcon={<Add />}
//         fullWidth
//         variant="contained"
//         color="primary"
//       >
//         Добавить вопрос
//       </Button>
//       <Button type="submit" fullWidth variant="contained" color="primary">
//         Добавить тест
//       </Button>
//     </form>
//   );
// };

// export default TestAddForm;
