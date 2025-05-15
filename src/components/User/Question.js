import _ from "lodash";
import { useTranslation, Trans } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
const Question = (props) => {
    const { t } = useTranslation();
    const { data, index, handleCheck, isShowAnswer, isSubmitQuiz } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }
    const handleCheckBox = (event, aId, qId) => {
        handleCheck(aId, qId)
    }
    return (
        <>
            {data && data.image ?
                <div className="q-img">
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
                :
                <div className="q-img">
                </div>
            }

            <div className="question">
                {t('question.title1')} {index + 1}:  {data.questionDescription}?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div className="choose" key={`answer-${index}`}>
                                <div className="form-check" >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(event) => { handleCheckBox(event, item.id, data.questionId) }}
                                        checked={item.isSelected}
                                        disabled={isSubmitQuiz}
                                    />
                                    <label className="form-check-label">
                                        {item.description}
                                    </label>
                                    {isShowAnswer === true &&
                                        <>
                                            {item.isSelected === true && item.isCorrect === false
                                                && <IoIosClose style={{ color: 'red', marginLeft: '10px', fontSize: '25px' }} />
                                            }

                                            {item.isCorrect === true
                                                && <IoIosCheckmark style={{ color: 'green', marginLeft: '10px', fontSize: '25px' }} />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;