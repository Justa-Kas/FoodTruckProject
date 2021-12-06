/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PassportPageComponent } from './passport-page.component';

let component: PassportPageComponent;
let fixture: ComponentFixture<PassportPageComponent>;

describe('passportPage component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PassportPageComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PassportPageComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});