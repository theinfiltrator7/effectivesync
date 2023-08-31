import React, {lazy, useState} from 'react';
import ReactModal from "react-modal";
import './CardModal.css'

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Button } from 'antd';
import { green } from '@mui/material/colors';

const CardModal = (props) => {

  
  let initialData = {
    title: "Enter title",
    priority: "MEDIUM",
    description: "Add a more detailed description",
    dueDate: "",
    completed: false,
    list: "",
    assignedTo: "", 
    rank: "",
    isDeleted: false  
  }
  
  const [cardData, setCardData] = useState(initialData);

  
  let onPriorityChangeHandler = (e) => {
    setCardData({...cardData, priority: e.target.value})
    console.log(cardData);
  };

  let onChangeHandler = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    })
  }

  let onDueDateChangeHandler = (value) => {
    setCardData({
      ...cardData,
      dueDate: value
    })
  }

  let getInitials = (name) => {
        const parts = name.split(' ');
        let initials = '';
    
        for (let i = 0; i < parts.length; i++) {
            initials += parts[i][0];
        }
        return initials;
    }


    return (
        <ReactModal
        ariaHideApp={false}
        isOpen={props.cardOpen}
        onRequestClose={props.modalClose}
        style={{
          overlay: {zIndex: 2},
          content: {
            top: "15vh",
            bottom: "15vh",
            left: "20vw",
            right: "20vw",
            minWidth: 600,
            borderRadius: 15,
            backgroundColor: "#fff9df",
          },
        }}
      >
        <div className='cardModalWrapper'>
          <div className="modalHeaderWrapper">
            <div>
              <input 
                name="title"
                value={cardData.title}
                onChange={(e) => onChangeHandler(e)}
                className="modalHeading" 
                style={{marginBottom: 0, fontFamily: "Ubuntu", fontSize: 15, padding: 10, width: 320}}/>
              <div className="modalSubHeading">in List</div>
            </div>
            <div className="modalHeaderFiller" />
            <div className="modalPriorityWrapper">
              <div className="modalSubHeading">Priority</div>
              <FormControl fullWidth>
                <Select
                style={{fontFamily: "Ubuntu"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cardData.priority}
                  label="Priority"
                  onChange={(e) => onPriorityChangeHandler(e)}
                >
                  <MenuItem style={{fontFamily: "Ubuntu"}} value={"HIGH"}>HIGH</MenuItem>
                  <MenuItem style={{fontFamily: "Ubuntu"}} value={"MEDIUM"}>MEDIUM</MenuItem>
                  <MenuItem style={{fontFamily: "Ubuntu"}} value={"LOW"}>LOW</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="modalHeading" >Description</div>
          <textarea
            name="description"
            onChange={(e) => onChangeHandler(e)}
            className="descriptionInputText"
            value={cardData.description}
          />
          <div className="dueDateWrapper">
            <div className="modalHeading">Due Date</div>
            <div style={{width: 210, paddingBottom: 20}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer 
              components={["DatePicker"]}>
                <DatePicker
                  value={cardData.dueDate}
                  onChange={(newValue) => onDueDateChangeHandler(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            </div>
          </div>
          <div className="modalHeading">Members</div>
          <div style={{ paddingBottom: 10 }}>@abedabraham98, @manukoshy</div>
          <div className="modalHeading">Checklist</div>
          <div className="itemHeadingWrapper">
            <div className="itemHeadings">DONE</div>
            <div className="itemHeadings">HOURS</div>
            <div className="itemHeadings">ITEM DESCRIPTION</div>
          </div>
          {/* {checkList.map((list, i) => {
            if (!list.isEditing) {
              return (
                <div
                  className="checklistWrapper"
                  key={i}
                  onClick={() => onEditListItem(i)}
                >
                  <Checkbox
                    checked={list.isDone}
                    onChange={() => onItemDoneHandler(i)}
                  />
                  <div className="checklistHours">{`${list.hours} hrs`}</div>
                  <div className="checklistDescription">{list.description}</div>
                </div>
              );
            } else {
              return (
                <div className="newCheckListWrapper" key={i}>
                  <div className="checklistWrapper">
                    <div className="checkListItemWrapper">
                      <div style={{ paddingLeft: 12 }}>Hours</div>
                      <input
                        className="listInputHours"
                        type="number"
                        value={list.hours}
                        onChange={(e) => onItemHoursChangeHandler(e, i)}
                      />
                    </div>
                    <div className="checkListItemWrapper">
                      <div style={{ paddingLeft: 12 }}>Item Description</div>
                      <input
                        className="listInputDescription"
                        value={list.description}
                        onChange={(e) => onItemDescriptionChangeHandler(e, i)}
                      />
                    </div>
                  </div>
                  <button
                    className="addItemButton"
                    onClick={() => onAddItemHandler(i)}
                  >
                    Save
                  </button>
                </div>
              );
            }
          })} */}
          <Button
            onClick={props.onAddNewItemHandler}
            style={{ marginTop: 10, marginBottom: 25, fontFamily: 'Ubuntu' }}
          >
            Add New Item to Checklist
          </Button>
          <div className="modalHeading">Comments</div>
          <div className="modalCommentWrapper">
            <div className="commentNameIcon">AA</div>
            <div className="commentContentWrapper">
              <div style={{ paddingBottom: 10 }}>Abed Abraham</div>
              <div className="commentContent">
                make the content in the component bit more bigger{" "}
              </div>
            </div>
          </div>
          <Button 
            onClick={() => props.onSubmit(cardData)}
            style={{marginTop: 30, backgroundColor: 'green' }}
            size= 'large'>Submit</Button>
        </div>
      </ReactModal> 
    )

}

export default CardModal;