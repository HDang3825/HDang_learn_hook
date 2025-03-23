import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const refDiv = useRef([]);
    const { dataQuiz, handleClickSubmit, setIndex } = props;
    const onTimeUp = () => {
        handleClickSubmit();
    }
    const getClassQuestion = (index, question) => {
        //ktra câu đã đc trl chưa
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question-num selected"
            }
        }
        return "question-num";
    }
    const handleClickQuestion = (question, index) => {
        setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question-num clicked") {
                    item.className = "question-num"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question-num clicked";
    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                className={getClassQuestion(index, item)}
                                key={`question-trl-${index}`}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
export default RightContent;