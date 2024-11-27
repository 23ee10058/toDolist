import React, { useState,useRef } from 'react'
import styles from './box.module.css'
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
function Box() {
    const taskInput=useRef()
    const error=useRef()
    const dateInput=useRef()
    const [display,setdisplay]=useState('none')
    const [dolist,setdolist]=useState([])
    const handleEdit=(e)=>{
        let indexVal=e.target.closest("[data-index]").getAttribute("data-index");
        taskInput.current.value=dolist[indexVal].task
        dateInput.current.value=dolist[indexVal].date
        dolist.splice(indexVal,1)
          console.log(e.target.closest("[data-index]").getAttribute("data-index"))
    }
    const handleDelete=(e)=>{
        let indexVal=e.target.closest("[data-index]").getAttribute("data-index");
        dolist.splice(indexVal,1)
        setdolist(dolist)
        
           
        console.log(dolist)
    }
    function add(){
        if((taskInput.current.value=='')||(dateInput.current.value=='')){
          setdisplay('flex')
        }
        else{
            setdisplay('none')
            let newArray=[...dolist,{task:taskInput.current.value,date:dateInput.current.value}]
            setdolist(newArray)
        }
       
        taskInput.current.value=''
        dateInput.current.value=''
    }

  return (

    <div className={styles.box}>
        <p ref={error} id={styles.error} style={{display}}>Please Enter full data</p>
        <div className={styles.input}>
            <input type="text" placeholder='Enter to do task' id={styles.input} ref={taskInput} />
            <input type="datetime-local" name="deadline" id={styles.date} ref={dateInput}/>
            <button id={styles.add} onClick={add} >Add</button>
        </div>
        <div className={styles.Task}>
            
            {
                dolist.map((item,index)=>(
            <>
            <div className={styles.box1} data-index={index}>
                {item.task}
            </div>

            <div className={styles.box2} data-index={index}>
                {item.date}
            </div>
            <div className={styles.box3}>
                <div className={styles.edit} data-index={index}
                onClick={(e)=>handleEdit(e)}><MdEdit size={30} color='red'/></div>
                 <div className={styles.delete}
                 data-index={index} onClick={(e)=>handleDelete(e)}><AiFillDelete size={30} color='blue'/></div>
            </div>
            </>
                ))
            }
            
        </div>
    </div>
  )
}

export default Box