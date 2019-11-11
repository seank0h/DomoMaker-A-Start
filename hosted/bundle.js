"use strict";

var handleQuest = function handleQuest(e) {
    e.preventDefault();

    $("#questMessage").animate({ width: 'hide' }, 350);

    if ($("#questName").val() == '' || $("#exp").val() == '' || $("#questType").val() == '') {
        handleError("Rawr! All fields are required");
        return false;
    }

    sendAjax('POST', $("#questForm").attr("action"), $("#questForm").serialize(), function () {
        loadQuestsFromServer();
    });

    return false;
};
var deleteQuest = function deleteQuest(e) {
    e.preventDefault();
};
var QuestForm = function QuestForm(props) {
    return React.createElement(
        "form",
        { id: "questForm", name: "questForm",
            onSubmit: handleQuest,
            action: "/maker",
            method: "POST",
            className: "questForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "questName", type: "text", name: "name", placeholder: "Quest Name" }),
        React.createElement(
            "label",
            { htmlFor: "Quest Type" },
            "Quest Type: "
        ),
        React.createElement("input", { id: "questType", type: "text", name: "questType", placeholder: "Quest Type" }),
        React.createElement(
            "label",
            { htmlFor: "Experience" },
            "Experience: "
        ),
        React.createElement("input", { id: "exp", type: "text", name: "exp", placeholder: "EXP Reward" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeQuestSubmit", type: "submit", value: "Make Quest" })
    );
};

var QuestList = function QuestList(props) {
    if (props.quest.length === 0) {
        return React.createElement(
            "div",
            { className: "questList" },
            React.createElement(
                "h3",
                { className: "emptyQuest" },
                "No Quests Yet"
            )
        );
    }
    var questNodes = props.quest.map(function (quest) {
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

        return React.createElement(
            "div",
            { key: quest._id, className: "quest" },
            React.createElement("img", { src: "/assets/img/scrollQuest.png", alt: "domo face", className: "scrollQuest" }),
            React.createElement(
                "h3",
                { className: "questName" },
                "Name: ",
                quest.name
            ),
            React.createElement(
                "h3",
                { className: "questType" },
                "Quest Type: ",
                quest.questType
            ),
            React.createElement(
                "h3",
                { className: "experience" },
                "EXP: ",
                quest.experience
            ),
            React.createElement(
                "div",
                { "class": "navlink" },
                React.createElement(
                    "a",
                    { id: "editButton", href: "/editQuest" },
                    "Edit"
                )
            ),
            React.createElement(
                "div",
                { "class": "navlink" },
                React.createElement(
                    "a",
                    { id: "deleteButton", href: "/deleteQuest", onClick: deleteQuest },
                    "Delete"
                )
            )
        );
    });
    return React.createElement(
        "div",
        { className: "questList" },
        questNodes
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
var loadQuestsFromServer = function loadQuestsFromServer() {
    sendAjax('GET', '/getQuests', null, function (data) {
        ReactDOM.render(React.createElement(QuestList, { quests: data.quests }), document.querySelector("#quests"));
    });
};
var deleteQuestFromServer = function deleteQuestFromServer() {};
var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(QuestForm, { csrf: csrf }), document.querySelector("#makeQuest"));
    /*
    ReactDOM.render(
        <questDropDown/>,document.querySelector("#questType")
    );
    */
    ReactDOM.render(React.createElement(QuestList, { quests: [] }), document.querySelector("#quests"));

    loadQuestsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#questMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#questMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
