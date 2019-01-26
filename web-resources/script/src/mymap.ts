import {HTML} from "../../lib/core/html";
import selectAll = HTML.selectAll;
import {$extend} from "../../lib/core/core";
import {Events} from "../../lib/core/events";
import propertyMap = Events.propertyMap;
import {Arrays} from "../../lib/core/arrays";
import compile = HTML.compile;
import {_forEach} from "../../lib/core/_func/array";
import {Forms} from "../../lib/core/form/Forms";


class ItemForm {

    group: AudioGroup;
    item: AudioItem

    headerElement: HTMLElement;
    $form: Forms

    constructor(public element: HTMLElement) {
        element.parentElement.removeChild(element);
        element.classList.add('on');
        this.$form = Forms.createForms(element);
        this.headerElement = element.querySelector('.header');

        propertyMap(element, 'click', this);
    }

    on(group: AudioGroup, item?: AudioItem) {

        console.log(item);

        this.$form.reset(this.item = item);

        this.group = group;
        this.headerElement.textContent = group.name;
        document.body.appendChild(this.element);

        return this;
    }

    $off() {
        this.element.parentElement.removeChild(this.element);
        return this;
    }


    $commit() {
        let {group, item} = this, values = this.$form.values();

        if (item) {
            item.setData(values);
            group.render();
        } else {
            group.addItem(new AudioItem(values)).render();
        }
        this.$off();
    }


}


let

    $itemTemplate = compile(document.getElementById('item-template').innerText),

    $disassem = {
        datetime(d, self) {
            if (typeof d === 'number') self.datetime = new Date(d);
            else if (d instanceof Date) self.datetime = d;
        }
    },


    dummy = {
        speaker: [
            {datetime: new Date(), brand: 'ATC', name: 'SCM 100'},
            {datetime: new Date(), brand: 'ATC', name: 'SCM 50'}
        ]
    },

    $itemForm = new ItemForm(document.getElementById('add-item'));


class AudioGroup {

    key: string
    name: string
    container: HTMLElement
    items: AudioItem[] = []

    constructor(public element: HTMLElement) {
        let nameEle = element.querySelector('[data-name]');

        this.key = nameEle.getAttribute('data-name');
        this.name = nameEle.textContent;
        this.container = element.querySelector('.list-groups');

        propertyMap(element, 'click', this);
    }

    $add() {
        $itemForm.on(this);
    }

    $modify({id}: {id: number}) {
        $itemForm.on(this, this.items[id]);
    }

    $remove({id}: {id: number}) {
        this.removeItem(id).render();
        return this;
    }

    addItem(item: AudioItem) {
        let {items} = this;
        if (items.indexOf(item) === -1) items.push(item);
        return this;
    }

    removeItem(index: number)
    removeItem(item: AudioItem)
    removeItem(item) {
        let {items} = this;

        if (typeof item !== 'number')
            item = items.indexOf(item);

        item !== -1 && items.splice(item, 1);

        return this;
    }


    render() {
        this.container.innerHTML = Arrays.slice(this.items, 6, (v, i) => {
            return '<div class="row">' + v.map((a, ii) => $itemTemplate({
                item: a, index: ii * (i + 1)
            })).join('') + '</div>';
        }).join('');

        return this;
    }

}

class AudioItem {
    id: number
    datetime: Date = new Date()
    brand: string
    name: string

    constructor(data) {
        data && this.setData(data);
    }

    setData(data) {
        $extend(this, data, $disassem);
        return this;
    }
}


selectAll(document.body,
    ['main', '.list-container[]'],
    (body: HTMLBodyElement, main: HTMLMainElement, cons: NodeListOf<HTMLElement>) => {
        _forEach(cons, (e) => {
            let group = new AudioGroup(e);
            /*if (dummy[group.key]) {
                dummy[group.key].forEach(data => group.addItem(new AudioItem(data)));
                group.render();
            }*/
        })
    });


