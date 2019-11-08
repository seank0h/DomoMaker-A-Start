"use strict";

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#exp").val() == '' || $("#questType").val() == '') {
        handleError("Rawr! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};
var deleteQuest = function deleteQuest(e) {
    e.preventDefault();
};
var DomoForm = function DomoForm(props) {
    return React.createElement(
        "form",
        { id: "domoForm", name: "domoForm",
            onSubmit: handleDomo,
            action: "/maker",
            method: "POST",
            className: "domoForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
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
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
    );
};

var DomoList = function DomoList(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Domos Yet"
            )
        );
    }
    var domoNodes = props.domos.map(function (domo) {
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
            { key: domo._id, className: "domo" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
            React.createElement(
                "h3",
                { className: "domoName" },
                "Name: ",
                domo.name
            ),
            React.createElement(
                "h3",
                { className: "domoAge" },
                "Age: ",
                domo.age
            ),
            React.createElement(
                "h3",
                { className: "questType" },
                "Quest Type: ",
                domo.questType
            ),
            React.createElement(
                "h3",
                { className: "experience" },
                "EXP: ",
                domo.experience
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
        { className: "domoList" },
        domoNodes
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
var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getDomos', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    });
};
var deleteQuestFromServer = function deleteQuestFromServer() {};
var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));
    /*
    ReactDOM.render(
        <questDropDown/>,document.querySelector("#questType")
    );
    */
    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    loadDomosFromServer();
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
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
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
