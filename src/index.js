import React,{Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService/index";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result"

class Quizee extends Component{

    state={
        questionBank:[],
        score:0,
        response:0
    }
    getQuestion=()=>{
        quizService().then(question=>{
            this.setState({
                questionBank:question
            });
        });
    };
    ComputeAnswer=(answer,correct)=>{
        if(answer===correct){
            this.setState({
                score:this.state.score+1
            });
        }
        this.setState({
            response:this.state.response < 5 ? this.state.response + 1 : 5
        });
    }
    playAgain=()=>{
        this.getQuestion();
        this.setState({
            score:0,
            response:0
        });
    }

    componentDidMount(){
        this.getQuestion();
    };


    render(){
        return(
            <div className="container">
                <div className="title">Quizee</div>
               
                {this.state.questionBank.length >0 && this.state.response<5 && this.state.questionBank.map(({question,answers,correct,questionId})=>
                 (<QuestionBox question={question} options={answers} key={questionId} 
                 selected={answer=>(this.ComputeAnswer(answer,correct))}/>))}
                 {this.state.response===5?(<Result score={this.state.score} playAgain={this.playAgain}/>):null}
                
            </div>
            
        )};

}
ReactDOM.render(<Quizee/>,document.getElementById("root"));


