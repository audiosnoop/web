import {HTML} from "../../lib/core/html";
import selectAll = HTML.selectAll;

let $global: global = window['global'];

selectAll(document.body,
    ['#keyword', '#search-result'],
    (b, keyword: HTMLElement, tbody: HTMLTableSectionElement) => {

        keyword.textContent = $global.query['search'];

    });