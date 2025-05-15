import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitAnswers } from "../../services/apiServices";
import _ from "lodash";
import './DetailQuiz.scss'
import Question from "./Question";
import ModelTotalQuiz from "./ModelTotalQuiz";
import RightContent from "./Content/RightContent";
import { useTranslation, Trans } from "react-i18next";
import { Breadcrumb } from "react-bootstrap";
const DetailQuiz = (props) => {
    const { t } = useTranslation();
    const param = useParams();
    const location = useLocation();
    const [index, setIndex] = useState(0);
    const [dataQuiz, setDataQuiz] = useState([]);
    const quizId = param.id;
    const [showModelTotal, setShowModelTotal] = useState(false)
    const [dataModelTotal, setDataModelTotal] = useState({})
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const getQuiz = async () => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers)
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
        }


    }
    useEffect(() => {
        getQuiz();
    }, [quizId])
    const handleClickNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleClickPrev = () => {
        if (index > 0)
            setIndex(index - 1)
    }
    const handleCheck = (aId, qId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(a => +a.questionId === +qId)
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (item.id === +aId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(a => +a.questionId === +qId)
        dataQuizClone[index] = question;
        if (index > -1) {
            setDataQuiz(dataQuizClone)
        }
    }
    const handleClickSubmit = async () => {
        let payLoad = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach(a => {
                    if (a.isSelected === true)
                        userAnswerId.push(a.id)
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payLoad.answers = answers;
            let res = await postSubmitAnswers(payLoad)
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModelTotal({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData

                })
            }
            setShowModelTotal(true)
            if (res.DT && res.DT.quizData) {
                let dataQuizClone = _.cloneDeep(dataQuiz);
                let a = res.DT.quizData;
                for (let q of a) {
                    for (let i = 0; i < dataQuizClone.length; i++) {
                        if (+q.questionId === +dataQuizClone[i].questionId) {
                            let newAnswers = [];
                            for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                if (s) {
                                    dataQuizClone[i].answers[j].isCorrect = true;
                                }
                                newAnswers.push(dataQuizClone[i].answers[j]);
                            }
                            dataQuizClone[i].answers = newAnswers;
                        }
                    }
                }
                setDataQuiz(dataQuizClone);
            }
        }
    }
    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }
    return (
        <>
            <Breadcrumb className="header-quiz">
                <NavLink to='/' className='breadcrumb-item'>Home</NavLink>
                <NavLink to='/users' className='breadcrumb-item'>
                    Users
                </NavLink>
                <NavLink active className='breadcrumb-item'>Quiz</NavLink>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        {t('detailquiz.title1')} {quizId}: {location?.state?.quizTitle}
                        <hr />
                    </div>
                    <div className="q-content">
                        <Question
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                            index={index}
                            handleCheck={handleCheck}
                            isShowAnswer={isShowAnswer}
                            isSubmitQuiz={isSubmitQuiz}
                        />
                    </div>
                    <div className="q-footer">
                        <button onClick={() => { handleClickPrev() }} className="btn btn-secondary">
                            {t('detailquiz.title2')}
                        </button>
                        <button onClick={() => { handleClickNext() }} className="btn btn-primary">
                            {t('detailquiz.title3')}
                        </button>
                        <button disabled={isSubmitQuiz} onClick={() => { handleClickSubmit() }} className="btn btn-warning">
                            {t('detailquiz.title4')}
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleClickSubmit={handleClickSubmit}
                        setIndex={setIndex}
                    />
                </div>
                <ModelTotalQuiz
                    show={showModelTotal}
                    setShow={setShowModelTotal}
                    data={dataModelTotal}
                    handleShowAnswer={handleShowAnswer}
                />
            </div>
        </>
    )
}
export default DetailQuiz;