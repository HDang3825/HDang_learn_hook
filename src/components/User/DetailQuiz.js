import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitAnswers } from "../../services/apiServices";
import _ from "lodash";
import './DetailQuiz.scss'
import Question from "./Question";
import ModelTotalQuiz from "./ModelTotalQuiz";
const DetailQuiz = (props) => {
    const param = useParams();
    const location = useLocation();
    const [index, setIndex] = useState(0);
    const [dataQuiz, setDataQuiz] = useState([]);
    const quizId = param.id;
    const [showModelTotal, setShowModelTotal] = useState(false)
    const [dataModelTotal, setDataModelTotal] = useState({})
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
                        answers.push(item.answers)
                    })
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
                setDataModelTotal({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData

                })
            }
            setShowModelTotal(true)
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Bài {quizId}: {location?.state?.quizTitle}
                    <hr />
                </div>
                <div className="q-content">
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                        handleCheck={handleCheck}
                    />
                </div>
                <div className="q-footer">
                    <button onClick={() => { handleClickPrev() }} className="btn btn-secondary">
                        Trước
                    </button>
                    <button onClick={() => { handleClickNext() }} className="btn btn-primary">
                        Kế Tiếp
                    </button>
                    <button onClick={() => { handleClickSubmit() }} className="btn btn-warning">
                        Nộp Bài
                    </button>
                </div>
            </div>
            <div className="right-content">
                right
            </div>
            <ModelTotalQuiz
                show={showModelTotal}
                setShow={setShowModelTotal}
                data={dataModelTotal}
            />
        </div>
    )
}
export default DetailQuiz;