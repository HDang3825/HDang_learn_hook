import { useState, useEffect } from "react";
import Select from "react-select"
import './QuizQA.scss'
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { getAllQuizForAdmin, getQuizWithQA, postUpsertQA } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";
const QuizQA = (props) => {
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
    function urltoFile(url, filename, mimeType) {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }


    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            // chuyển base64 sang file object
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q);
            }
            setQuestions(newQA)
        }
    }
    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);
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
                    if (count !== 1)
                        count++;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;

        }
        if (isValidAnswer === false) {
            toast.error(`${t('managequestion.title5')} ${indexA + 1} t('managequestion.title6') ${indexQ + 1}`)
            return;
        }
        if (count !== 1) {
            toast.error(`${t('managequestion.title4')} ${indexQ + 1}`)
            return;
        }
        let questionsClone = _.cloneDeep(questions)
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        if (res && res.EC === 0) {
            toast.success(t('editquiz2.title1'))
            fetchQuizWithQA();
        }
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    return (
        <div className="question-container">
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
                                                        placeholder={t('managequestion.title11')}
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
export default QuizQA;