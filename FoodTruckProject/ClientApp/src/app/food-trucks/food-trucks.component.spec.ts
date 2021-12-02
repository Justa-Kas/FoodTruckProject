/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FoodTrucksComponent } from './food-trucks.component';

let component: FoodTrucksComponent;
let fixture: ComponentFixture<FoodTrucksComponent>;

describe('FoodTrucks component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FoodTrucksComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FoodTrucksComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});