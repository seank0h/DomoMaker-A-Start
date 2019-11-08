const handleDomo = (e) =>{
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val()==''|| $("#domoAge").val()=='' || $("#exp").val()==''||$("#questType".val()==''))
    {
        handleError("Rawr! All fields are required");
        return false;
    }

    sendAjax('POST',$("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
        loadDomosFromServer();
    });
    return false;
};

const DomoForm = (props) =>{
    return(
        <form id="domoForm" name="domoForm"
        onSubmit ={handleDomo}
        action ="/maker"
        method="POST"
        className ="domoForm"
        >
            <label htmlFor ="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder ="Domo Name"/>
            <label htmlFor ="age">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder ="Domo Age"/>
            <label htmlFor ="Quest Type">Quest Type: </label>
            <input id="questType" type="text" name="questType" placeholder ="Quest Type"/>
            <label htmlFor ="Experience">Experience: </label>
            <input id="exp" type="text" name="exp" placeholder ="EXP Reward"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className ="makeDomoSubmit" type="submit" value ="Make Domo"/>
        </form>
    );
};

const DomoList = function(props)
{
    if(props.domos.length === 0)
    {
        return(
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet</h3>
            </div>
        );
    }
const domoNodes = props.domos.map(function(domo)
{
    return(
        <div key={domo._id} className="domo">
            <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace"/>
            <h3 className="domoName">Name: {domo.name}</h3>
            <h3 className="domoAge">Age: {domo.age}</h3>
            <h3 className="questType">Quest Type: {domo.questType}</h3>
            <h3 className="experience">EXP: {domo.exp}</h3>
            <div class="navlink"><a id="editButton" href="/editQuest">Edit</a></div>
            <div class="navlink"><a id="deleteButton" href="/deleteQuest">Delete</a></div>
        </div>
    );
});
return (
    <div className="domoList">
        {domoNodes}
    </div>
);
};

const loadDomosFromServer = () =>{
    sendAjax('GET', '/getDomos', null, (data) =>{
        ReactDOM.render(
            <DomoList domos ={data.domos}/>, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf){
    ReactDOM.render(
        <DomoForm csrf ={csrf}/>, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos ={csrf}/>, document.querySelector("#domos")
    );
    const editButton = document.querySelector("#editButton");
    const deleteButton = document.querySelector("#deleteButton");
    editButton.addEventListener("click", (e)=>{
        e.preventDefault();
        
        return false;
    });
    deleteButton.addEventListener("click", (e)=>{
        e.preventDefault();
        
        return false;
    });
    loadDomosFromServer();
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});