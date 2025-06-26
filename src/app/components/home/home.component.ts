import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeaderComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    ngOnInit() {
        
    }
}