const handleQuest = (e) =>{
    e.preventDefault();

    $("#questMessage").animate({width:'hide'},350);

    if($("#questName").val()==''|| $("#exp").val()==''||$("#questType").val()=='')
    {
        handleError("Rawr! All fields are required");
        return false;
    }

    sendAjax('POST',$("#questForm").attr("action"), $("#questForm").serialize(), function(){
        loadQuestsFromServer();
        
    });
    
    return false;
};
const deleteQuest = (e) =>{
    e.preventDefault();
    

}
const QuestForm = (props) =>{
    return(
        <form id="questForm" name="questForm"
        onSubmit ={handleQuest}
        action ="/maker"
        method="POST"
        className ="questForm"
        >
            <label htmlFor ="name">Name: </label>
            <input id="questName" type="text" name="name" placeholder ="Quest Name"/>
            <label htmlFor ="Quest Type">Quest Type: </label>
            <input id="questType" type="text" name="questType" placeholder ="Quest Type"/>
            <label htmlFor ="Experience">Experience: </label>
            <input id="exp" type="text" name="exp" placeholder ="EXP Reward"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className ="makeQuestSubmit" type="submit" value ="Make Quest"/>
        </form>
    );
};

const QuestList = function(props)
{
    if(props.quest.length === 0)
    {
        return(
            <div className="questList">
                <h3 className="emptyQuest">No Quests Yet</h3>
            </div>
        );
    }
const questNodes = props.quest.map(function(quest)
{
    /*
    this.state = {
        domo: []
      }
      this.delete = this.delete.bind(this);
      delete(id)
      {
        this.setState(prevState => ({
            domo: prevState.data.filter(el => el != id )
        }));
   }
   */
   
    return(
        <div key={quest._id} className="quest">
            <img src="/assets/img/scrollQuest.png" alt="domo face" className="scrollQuest"/>
            <h3 className="questName">Name: {quest.name}</h3>
            <h3 className="questType">Quest Type: {quest.questType}</h3>
            <h3 className="experience">EXP: {quest.experience}</h3>
            <div class="navlink"><a id="editButton" href="/editQuest">Edit</a></div>
            <div class="navlink"><a id="deleteButton" href="/deleteQuest" onClick ={deleteQuest}>Delete</a></div>
        </div>
    );
});
return (
    <div className="questList">
        {questNodes}
    </div>
);
};
/*
const questDropDown = function()
{
    
    return(
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   Quest Types:
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item>Daily</Dropdown.Item>
    <Dropdown.Item>Weekly</Dropdown.Item>
    <Dropdown.Item>Monthly</Dropdown.Item>
    <Dropdown.Item>Special</Dropdown.Item>
  </Dropdown.Menu>
  </Dropdown>
    )
}
*/
const loadQuestsFromServer = () =>{
    sendAjax('GET', '/getQuests', null, (data) =>{
        ReactDOM.render(
            <QuestList quests ={data.quests}/>, document.querySelector("#quests")
        );
    });
};
const deleteQuestFromServer = ()=>{

}
const setup = function(csrf){
    ReactDOM.render(
        <QuestForm csrf ={csrf}/>, document.querySelector("#makeQuest")
    );
    /*
    ReactDOM.render(
        <questDropDown/>,document.querySelector("#questType")
    );
    */
    ReactDOM.render(
        <QuestList quests ={[]}/>, document.querySelector("#quests")
    );
  
    loadQuestsFromServer();
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});