const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();
const db =require('./db.js')



app.get('/:quiz_Id' , (req ,res)=>{
    const quiz_id = req.params.quiz_Id ;
    // console.log(quiz_id)
   
    db.query('SELECT * FROM Questions where quiz_id = ?',[quiz_id] , (err, results)=>{
if (err) return res.status(500).json({error:err.message});
res.json(results);
    })
});
// create table Questions (
//     Question_No  Int  auto_increment ,
//     quiz_id varchar(10) ,
//     Question varchar(200) ,
//     option_1 varchar(100) ,
//     option_2 varchar(100) ,
//     option_3 varchar(100) ,
//     option_4 varchar(100), 
//     Answer varchar(100),
//     foreign key (quiz_id ) REFERENCES Quiz(quiz_Id) ,
//     primary key( Question_No , quiz_id)
//    );
   
   
   
app.post('/create' , (req,res)=>{
const {Question_No, quiz_id, Question, option_1, option_2, option_3, option_4, Answer} = req.body ;
console.log(Question_No, quiz_id, Question, option_1, option_2, option_3, option_4, Answer);

db.query('INSERT INTO Questions (Question_No ,quiz_id ,Question, option_1, option_2, option_3, option_4, Answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[Question_No, quiz_id, Question, option_1, option_2, option_3, option_4, Answer],(err,results)=>{
    if (err) return res.status(500).json({error:err.message}) ;
    res.json({message:'Question Added successfully ...'}) ;
})

});

app.delete('/delete/:Question_No/:quiz_id',(req,res)=>{
    const Question_No =req.params.Question_No ;
    const quiz_id =req.params.quiz_id ;
    console.log(Question_No,quiz_id)
    db.query('DELETE FROM Questions WHERE Question_No = ? and quiz_id = ? ',[Question_No,quiz_id],(err,results)=>{
        if (err) return res.status(500).json({error:err.message});
        res.json({message:"Question deleted successfully"})

    })
});
// create table result (
//     Question_Id Int primary key ,
//     Selected_Ans varchar(100) ,
//     FOREIGN KEY (Question_Id) REFERENCES Questions(Id) ON DELETE CASCADE
//     ); 

app.post('/submit-all',(req,res)=>{
    
    const { Question_Id , Selected_Ans } =req.body;
    console.log(Question_Id , Selected_Ans )
    db.query('Insert Into result (Question_Id ,Selected_Ans) Values (?, ?) ',[ Question_Id , Selected_Ans],(err,results)=>{
        if (err) return res.status(500).json({error:err.message}) ;
        res.json({message:"Question deleted successfully"})
    })

})
// create table Quiz(
//     quiz_Id Int Primary key ,
//     quiz_name varchar(15) ,
//     quiz_description varchar(50) 
//     );
app.get('/' ,(req,res)=>{
    db.query('select * from Quiz ;',(err,results)=>{
        if (err) return res.status(500).json({error:err.message});
res.json(results);
    })
})

// create table Quiz(
//     quiz_Id varchar(10) Primary key ,
//     quiz_name varchar(15) ,
//     quiz_description varchar(50) 
//     );
app.post('/createquiz',(req,res)=>{
    const { quiz_Id , quiz_name ,quiz_description  }= req.body;
    console.log(quiz_Id , quiz_name ,quiz_description )
    db.query('Insert Into Quiz ( quiz_Id , quiz_name ,quiz_description) Values (?, ?, ?) ',[quiz_Id , quiz_name , quiz_description ],(err,results)=>{
        if (err) return res.status(500).json({error:err.message}) ;
        res.json({message:" quiz created successfully"})
    })

})



app.delete('/deletequiz/:quiz_Id',(req,res)=>{
    const quiz_Id =req.params.quiz_Id ;
    console.log(quiz_Id)
    db.query('DELETE FROM Quiz WHERE quiz_Id = ?',[quiz_Id],(err,results)=>{
        if (err) return res.status(500).json({error:err.message});
        res.json({message:"Question deleted successfully"})

    })
});

// this is for submitting the result 
// create table result (
//     student_Id int ,
//     Quiz_Id varchar(10),
//     Question_Id Int ,
//     Selected_Ans varchar(100) ,
//     Marks boolean ,



app.post('/api/result',(req,res)=>{

    const { student_Id , Quiz_Id ,Question_Id,Selected_Ans ,Answer  }= req.body;
    let Marks = false ;
    if (Selected_Ans == Answer)
    {
        Marks = true ;
    }
    else{
        Marks = false ;
    }
    console.log(student_Id , Quiz_Id ,Question_Id,Selected_Ans,Answer,Marks)
    db.query('Insert Into result ( student_Id , Quiz_Id ,Question_Id,Selected_Ans,Marks) Values (?, ?, ?, ?, ?) ',[student_Id , Quiz_Id ,Question_Id,Selected_Ans,Marks],(err,results)=>{
        if (err) return res.status(500).json({error:err.message}) ;
        res.json({message:" quiz created successfully"})
    })

})

// app.get()
// http://localhost:3000/api/getresult

// app.get('/api/getresult/:quiz_Id' ,(req,res)=>{
//     console.log("called")
//     const quiz_Id = req.params.quiz_Id ;
//     console.log(quiz_Id)
//     db.query('select count(Marks)  result where Marks = 1 and and Quiz_Id ?',[quiz_Id],(err,results)=>{
//         if (err) return res.status(500).json({error:err.message});
//         console.log(results);
        
//            res.json(results);

//     })
// })
app.get('/api/getresult/:quiz_Id', (req, res) => {
    const quiz_Id = req.params.quiz_Id;
    const query = `
        SELECT 
            COUNT(*) AS totalQuestions,
            SUM(CASE WHEN Marks = 1 THEN 1 ELSE 0 END) AS correctAnswers,
            SUM(CASE WHEN Marks = 0 THEN 1 ELSE 0 END) AS wrongAnswers,
            SUM(Marks) AS obtainedMarks
        FROM result
        WHERE Quiz_Id = ?`;

    db.query(query, [quiz_Id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Ensure result exists
        if (results.length > 0) {
            const data = results[0];
            res.json({
                totalQuestions: data.totalQuestions,
                correctAnswers: data.correctAnswers || 0,
                wrongAnswers: data.wrongAnswers || 0,
                obtainedMarks: data.obtainedMarks || 0
            });
        } else {
            res.status(404).json({ message: 'No results found for this quiz.' });
        }
    });
});



// exports.deleteStudent = (req, res) => {
//     const ID=req.params.ID;
    
//     db.query('DELETE FROM Students WHERE ID = ?', [ID], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'Student Deleted' });
//     });


// };

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

