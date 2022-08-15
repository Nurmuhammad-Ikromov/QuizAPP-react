import React, { useState, useEffect } from 'react';
import { Button, Card, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import './quiz.css';
import { useNavigate, useLocation } from "react-router-dom"

const Quiz = ({ quizData }) => {
    const [currentQuiz, setCurrentQuiz] = useState(0)
    // const faceData = [{ "category": "Entertainment: Music", "type": "multiple", "difficulty": "hard", "question": "Which of these songs was released in 1996?", "correct_answer": "The Smashing Pumpkins - &quot;1979&quot;", "incorrect_answers": ["Prince - &quot;1999&quot;", "James Blunt - &quot;1973&quot;", "David Bowie - &quot;1984&quot;"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "easy", "question": "What is the best selling album of all time from 1976 to 2018?", "correct_answer": "Thriller", "incorrect_answers": ["Back in Black", "Abbey Road", "The Dark Side of the Moon"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "hard", "question": "Which member of the English band &quot;The xx&quot; released their solo album &quot;In Colour&quot; in 2015?", "correct_answer": "Jamie xx", "incorrect_answers": ["Romy Madley Croft", "Oliver Sim", "Baria Qureshi"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "easy", "question": "What is the name of the album released in 2014 by American band Maroon 5?", "correct_answer": "V", "incorrect_answers": ["X", "III", "IV"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "hard", "question": "Who won the 1989 Drum Corps International championships?", "correct_answer": "Santa Clara Vanguard", "incorrect_answers": ["Blue Devils", "The Academy", "The Bluecoats"] }, { "category": "Entertainment: Music", "type": "boolean", "difficulty": "easy", "question": "The alternative rock band, They Might Be Giants, released their album &#039;Flood&#039; in 1990. ", "correct_answer": "True", "incorrect_answers": ["False"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "medium", "question": "Which one of these rappers is NOT a member of the rap group Wu-Tang Clan?", "correct_answer": "Dr.Dre", "incorrect_answers": ["Ol&#039; Dirty Bastard", "GZA", "Method Man"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "medium", "question": "Which rapper had an album that went double platinum with no features?", "correct_answer": "J. Cole", "incorrect_answers": ["Kendrick Lamar", "Drake", "Big Sean"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "medium", "question": "What was the name of Pink Floyd&#039;s first studio album?", "correct_answer": "The Piper at the Gates of Dawn", "incorrect_answers": ["Ummagumma", "More", "Atom Heart Mother"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "hard", "question": "Pete Townshend collaborated with which famous guitarist for an event at Brixton Academy in 1985?", "correct_answer": "David Gilmour", "incorrect_answers": ["Jimmy Page", "Mark Knopfler", "Eric Clapton"] }]
    let [arrData, setArrData] = useState([])
    let arr = [];
    const [modal, setModal] = useState(false)
    const [count, setCount] = useState(0)
    const [finishBtn, setFinishBtn] = useState(false)
    const [Ok, setOk]  = useState(false)

    const location = useLocation()
    let faceData = [...location.state.data]

    const navigate = useNavigate()



    useEffect(() => {
        faceData.forEach((element) => {
            let variants = [...element.incorrect_answers, element.correct_answer]
            let faceVariants = [], arrV = []
            let i = 0
            console.log(Math.floor(Math.random() * 4));

            // testlarni generatsiya qilish
            while (i <= 3) {
                let rand = Math.floor(Math.random() * 4);
                if (!arrV.includes(rand)) {
                    arrV.push(rand)
                    faceVariants.push(variants[rand])
                    i++;
                }
            }

            console.log(faceVariants);

            let data = {
                question: element.question,
                correct_answer: element.correct_answer,
                variants: faceVariants,
                Correct: null,
            }
            arr.push(data)
        })
        setArrData(arr)
    }, []);


    console.log(arrData);

    function prev() {
        setCurrentQuiz(currentQuiz - 1)
    }

    function next() {
        setCurrentQuiz(currentQuiz + 1)
    }

    function btnChange(current) {
        setCurrentQuiz(current)
    }

    function radioChange(index, el) {
        console.log(index, el);
        let arr1 = arrData

        arr1[currentQuiz].Correct = el

        setArrData([...arr1])

    }


    function finish() {
        let k = 0
        arrData.forEach((element) => {
            if (element.Correct === element.correct_answer) {
                k++
            }
        })
        setCount(k);
        setModal(true)
    }


    return (
        <div>


            <Container>
                <div style={{display: "flex", justifyContent: 'center', flexWrap:"wrap", marginBottom: '20px'}}> {arrData?.length > 0 && arrData.map((el, id) => (
                    (id<arrData.length/2) &&
                     (
                        !Ok ? (
                            currentQuiz === id ? <Button key={id} onClick={() => btnChange(id)} variant="contained" color="primary" style={{ borderRadius: "0" }}> {id + 1}</Button>
                                : <Button key={id} onClick={() => btnChange(id)} variant="outlined" color="primary" style={{ borderRadius: "0" }}> {id + 1}</Button>)
                            : (el.correct_answer === el.Correct ? <Button key={id} onClick={() => btnChange(id)} variant="contained" color="success" style={{ borderRadius: "0" }}> {id + 1}</Button>
                                : <Button key={id} onClick={() => btnChange(id)} variant="contained" color="error" style={{ borderRadius: "0" }}> {id + 1}</Button>)

                    )
                ))}</div>

             

                <Typography component="p" textAlign="center">
                    Question # {currentQuiz + 1} / {faceData.length}
                </Typography>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    {arr?.length > 0 && arrData.map((el, id) => {
                        return (
                            currentQuiz === id ? <Button key={id}  onClick={() => btnChange(id)} variant="contained" color="primary" style={{ borderRadius: "0" }}> {id + 1}</Button>
                                : <Button key={id} onClick={() => btnChange(id)} variant="outlined" color="primary" style={{ borderRadius: "0" }}> {id + 1}</Button>

                        )
                    })}
                </div>

                <Card style={{ margin: "20px 0", padding: "20px" }}>
                    <Typography component="h3" textAlign="center" fontWeight="600" fontSize="24px">
                        {faceData[currentQuiz].question}
                    </Typography>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >

                        {(arrData[currentQuiz]?.variants?.length > 0) && arrData[currentQuiz].variants.map((el, index) => {
                           return (
                            !Ok ? ((arrData[currentQuiz].Correct === el) ? (<FormControlLabel onClick={() => radioChange(index, el)} value={el} control={<Radio checked />} label={el} />) : (<FormControlLabel onClick={() => radioChange(index, el)} value={el} control={<Radio />} label={el} />))
                                : ((el === arrData[currentQuiz].correct_answer) ? (<FormControlLabel style={{ background: "green" }} value={el} control={<Radio checked={true} color="success" />} label={el} />)
                                    : (((arrData[currentQuiz].Correct === arrData[currentQuiz].correct_answer) && (el === arrData[currentQuiz].correct_answer)) ? (<FormControlLabel style={{ background: "blue" }} value={el} control={<Radio checked={false} />} label={el} />) :
                                        (<FormControlLabel value={el} control={<Radio checked={false} />} label={el} />)))

                        )
                        })
                        }
                    </RadioGroup>

                    <Stack direction="row" justifyContent="space-between" marginTop={1}>
                        {currentQuiz === 0 ? <Button variant="contained" disabled onClick={prev}>Previous</Button> : <Button variant="contained" onClick={prev}>Previous</Button>}
                        {/* <Button variant="contained" >Submit</Button> */}
                        {currentQuiz === faceData.length - 1 ? <Button variant="contained" disabled onClick={next}>Next</Button> : <Button variant="contained" onClick={next}>Next</Button>}
                    </Stack>


                </Card>

                <Stack>
                    <Button variant="contained" style={{ marginLeft: "auto" }} disabled = {finishBtn} onClick={() => finish()}>Finish</Button>
                </Stack>
            </Container >

            {
                modal && (
                    <div className="modal_container">
                        <div className="modal_wrapper">
                            <Typography component="h3" variant="h3" textAlign="center" color="#2196f3">
                                Your results
                            </Typography>
                            <Typography component="h4" variant="h4" textAlign="center" color="#009688">
                                {count}/{faceData.length}
                            </Typography>
                            <Typography component="h4" variant="h4" textAlign="center" color="#ff5722">
                                or
                            </Typography>
                            <Typography component="h4" variant="h4" textAlign="center" color="#009688">
                                {count / faceData.length * 100}%
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" marginTop={1} style={{ width: "100%" }}>
                                <Button variant="outlined" style={{ marginRight: "5px", width: "100%", display: "block" }} onClick={() => {setModal(false) ;setOk(true); setFinishBtn(true)}}>OK</Button>
                                <Button variant="outlined" color="error" style={{ marginLeft: "5px", width: "100%", display: "block" }} onClick={() => navigate("/")}>GO Home</Button>
                            </Stack>
                        </div>
                    </div>
                    // <Card >
                    // </Card>
                )
            }
        </div>
    );
}

export default Quiz;
