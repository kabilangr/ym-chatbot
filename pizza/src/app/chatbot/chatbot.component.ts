import { Component, OnInit } from '@angular/core';
import { MenuList } from '../menu';
import { MenuService } from '../menu.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit {
  constructor(private menuService: MenuService) {}
  items: number = 0;
  low: any = [];
  stringslice: string[] = [];
  slicer: string[] = [];
  replyMessage: any = '';
  i: number = 0;
  data: any = '';
  list: any = { title: '', size: '', price: 0.0, no: 0 };
  order: any = {
    name: '',
    phoneNO: 0,
    orderList: [],
  };
  s: MenuList[];
  loading: boolean = false;
  botTalk: string[] = [
    'Welcome to PizzaShop',
    "Let's Start",
    'Tell me the name of Order',
    'Tell me your Phone No.',
    'What do You like to have?',
    'Want to see the menu?',
    'What are the toppings?',
    'How many - wanted ?',
    'Do you like to order?',
    'Here is your Cart. can i place order?',
  ];
  ngOnInit(): void {
    if (this.i == 0)
      this.data = `<h2>LoLo: <br> ${
        this.botTalk[this.i] + '<br>' + this.botTalk[++this.i]
      }</h2>`;
    else this.data = `<h2>LoLo: <br> ${this.botTalk[this.i]}</h2>`;
    document.getElementById('wordfun').innerHTML = this.data;
  }
  reply(item): void {
    item = item.toLowerCase();
    this.stringslice = item.slice(' ');
    if (item == 'yes') {
      this.i++;
      this.ngOnInit();
    }
    if (this.stringslice[0] == 'i' && this.stringslice[1] == 'want') {
      for (let k = 0; k < this.stringslice.length; k++) {
        if (
          this.stringslice[k] == 'regular' ||
          this.stringslice[k] == 'medium' ||
          this.stringslice[k] == 'large'
        ) {
          this.list.size = this.stringslice[k];
        }
        for (let c of this.s) {
          if (c.name == this.stringslice[k]) {
            this.list.title = c.name;
          }
        }
      }
    }
    if (this.i == 2) {
      this.order.name = item;
      this.i++;
      this.ngOnInit();
    }
    if (this.i == 3) {
      this.order.phoneNo = item;
      this.i++;
      this.ngOnInit();
    } else {
      this.replyMessage = this.findCommand(item);
      this.data = `${this.replyMessage}`;
      document.getElementById('wordfun').innerHTML = this.data;
    }
  }
  findCommand(reply): string {
    if (reply == 'hi') {
      return `<h2>LoLo:<br> Hi.<br> ${this.botTalk[1]}</h2>`;
    }
    if (reply == 'show menu') {
      this.loading = true;
      this.menuService.getMenu().subscribe((data) => {
        this.loading = false;
        this.s = data;
        console.log(this.s);
      });
      this.low = this.s;
      console.log(this.low);
      this.i++;
      return `<h2>LoLo:<br> HERE IT IS</h2>`;
    }

    return 'Wrong answer';
  }
}
