export default function ({
    tag = "",
    classList = [],
    attributes = [],
    textContent = "",
    value = "",
    events = [],
    children = []
}) {

    const element = document.createElement(tag);
    
    if(classList.length > 0) element.classList.add(...classList);

    attributes.map(attribute => {
        element.setAttribute(attribute.name, attribute.value);
    });

    if (textContent !== "") element.textContent = textContent;
    if (value !== "") element.value = value;

    events.map(event => {
        element.addEventListener(event.type, event.onEvent);
    });

    children.map(child => element.appendChild(child));

    return element;
}

