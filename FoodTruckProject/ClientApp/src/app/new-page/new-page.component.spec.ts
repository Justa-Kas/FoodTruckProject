/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { NewPageComponent } from './new-page.component';

let component: NewPageComponent;
let fixture: ComponentFixture<NewPageComponent>;

describe('newPage component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NewPageComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(NewPageComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});