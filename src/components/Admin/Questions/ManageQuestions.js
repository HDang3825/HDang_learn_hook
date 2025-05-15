import { useState, useEffect } from "react";
import Select from "react-select"
import './ManageQuestions.scss'
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";
const ManageQuestions = (props) => {
    const { t } = useTranslation();
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        },
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion);
    const [listQuiz, setListQuiz] = useState();
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    useEffect(() => {
        fetchQuiz();
    }, []);
    const handleClickQuestion = (type, id) => {
        if (type === 'ADD') {
            let questionNew = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, questionNew]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(a => a.id !== id);
            setQuestions(questionClone)
        }
    }
    const handleClickAnswer = (type, qId, aId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(a => a.id === qId)
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }
        if (type === 'REMOVE') {
            questionClone[index].answers = questions[index].answers.filter(a => a.id !== aId);
            setQuestions(questionClone)
        }
    }
    const handleChangeDescription = (qId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(a => a.id === qId)
        if (index > -1) {
            questionClone[index].description = event.target.value;
            setQuestions(questionClone)
        }
    }
    const handleChangeUpload = (qId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(a => a.id === qId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone)
        }
    }
    const handleChangAnswer = (type, qId, aId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(a => a.id === qId)
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answers => {
                    if (answers.id === aId) {
                        if (type === 'CHECK') {
                            answers.isCorrect = event.target.checked;
                        }
                        if (type === 'INPUT') {
                            answers.description = event.target.value;
                        }
                    }
                    return answers;
                })
            setQuestions(questionClone)
        }
    }
    const handleClickSave = async () => {
        //validate bài quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error(t('managequestion.title1'))
            return
        }
        //validate câu hỏi
        let isValidQ = true; let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`${t('managequestion.title2')} ${indexQ1 + 1} ${t('managequestion.title3')}`);
            return;
        }
        //validate câu trl
        let isValidAnswer = true;
        let indexQ = 0; let indexA = 0; let count = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
                if (questions[i].answers[j].isCorrect) {
                    count++;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
            if (count !== 1) {
                toast.error(`${t('managequestion.title4')} ${indexQ + 1}`)
                return;
            } else {
                count = 0;
            }
        }
        if (isValidAnswer === false) {
            toast.error(`${t('managequestion.title5')} ${indexA + 1} ${t('managequestion.title6')} ${indexQ + 1}`)
            return;
        }
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            );
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description, answer.isCorrect, q.DT.id
                )
            }
        }
        toast.success(t('managequestion.title7'));
        setQuestions(initQuestion)
    }
    return (
        <div className="question-container">
            <div className="title">
                {t('managequestion.title8')}
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">{t('managequestion.title9')}</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="mt-3 mb-2">{t('managequestion.title10')}</div>
                {questions && questions.length > 0 &&
                    questions.map((item, index) => {
                        return (
                            <div className="q-main mb-4" key={item.id}>
                                <div className="question-content" >
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={t('managequestion.title11')}
                                            value={item.description}
                                            onChange={(event) => { handleChangeDescription(item.id, event) }}
                                        />
                                        <label style={{ zIndex: 0 }}>{t('managequestion.title2')} {index + 1} </label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${item.id}`}>
                                            <RiImageAddFill className="label-upload" />
                                        </label>
                                        <input
                                            id={`${item.id}`}
                                            type="file"
                                            onChange={(event) => { handleChangeUpload(item.id, event) }}
                                            hidden
                                        />
                                        <span>{item.imageFile && item.imageName ? item.imageName : t('managequestion.title12')}</span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => { handleClickQuestion("ADD", "") }}><BsPatchPlusFill className="icon-add" /> </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => { handleClickQuestion("REMOVE", item.id) }}><BsPatchMinusFill className="icon-remove" /> </span>
                                        }

                                    </div>
                                </div>
                                {item.answers && item.answers.length > 0 &&
                                    item.answers.map((item2, index2) => {
                                        return (
                                            <div className="answer-content " key={item2.id}>
                                                <input
                                                    className="form-check-input isCorrect"
                                                    type="checkbox"
                                                    checked={item2.isCorrect}
                                                    onChange={(event) => { handleChangAnswer('CHECK', item.id, item2.id, event) }}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Tên"
                                                        value={item2.description}
                                                        onChange={(event) => { handleChangAnswer('INPUT', item.id, item2.id, event) }}
                                                    />
                                                    <label style={{ zIndex: 0 }}>{index2 + 1 === 1 ? 'A' : index2 + 1 === 2 ? 'B' : index2 + 1 === 3 ? 'C' : 'D'}</label>
                                                </div>
                                                <div className="btn-group">
                                                    <span onClick={() => { handleClickAnswer('ADD', item.id) }}><AiFillPlusSquare className="icon-add" /> </span>
                                                    {item.answers && item.answers.length > 1 &&
                                                        <span onClick={() => { handleClickAnswer('REMOVE', item.id, item2.id) }}><AiOutlineMinusCircle className="icon-remove" /> </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button className="btn btn-warning" onClick={() => { handleClickSave() }}>{t('managequestion.title13')}</button>
                    </div>
                }
            </div>
        </div >
    )
}
export default ManageQuestions