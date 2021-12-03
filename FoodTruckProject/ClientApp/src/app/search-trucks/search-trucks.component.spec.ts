/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SearchTrucksComponent } from './search-trucks.component';

let component: SearchTrucksComponent;
let fixture: ComponentFixture<SearchTrucksComponent>;

describe('SearchTrucks component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchTrucksComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SearchTrucksComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});