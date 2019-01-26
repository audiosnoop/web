import {_forEach} from "../../lib/core/_func/array";
import {Search} from "../../lib/core/location";


let r = /^\//,
    $global: global = window['global'] = {};

export function $init(path = location.pathname, search = location.search) {

    let
        {body} = document,
        query = $global.query = Search.toObject(search),

        input = <HTMLInputElement>document.getElementById('search-input');

    if (path) {
        _forEach(body.querySelectorAll('[data-url]'), (t: HTMLElement) => {
            let url = t.getAttribute('data-url');
            if (url && path.indexOf(url) === 0) {
                t.classList.add('active');
            }
        });
    }

    input.value = query['search'] || '';

    input.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.keyCode === 13 && input.value) {
            location.href = '/search?search=' + input.value;
        }
    })

}
