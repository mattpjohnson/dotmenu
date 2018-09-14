export function createElement(querySelector) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var _a = querySelector.split('.'), tag = _a[0], classes = _a.slice(1);
    var element = document.createElement(tag);
    for (var _b = 0, classes_1 = classes; _b < classes_1.length; _b++) {
        var className = classes_1[_b];
        element.classList.add(className);
    }
    for (var _c = 0, children_1 = children; _c < children_1.length; _c++) {
        var child = children_1[_c];
        if (typeof child === 'string') {
            element.innerHTML += child;
        }
        else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    }
    return element;
}
//# sourceMappingURL=createElement.js.map