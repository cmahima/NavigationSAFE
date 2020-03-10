import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HereMapComponent } from "./here-map/here-map.component";

declare var H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private platform: any;
    public start: string;
    public finish: string;
    


    @ViewChild("map", { static: false })
    public mapElement: HereMapComponent;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "APP-ID-HERE",
            "app_code": "APP-CODE-HERE"            
        });
        this.start = "43.673640,-79.497160";
        this.finish = "43.771912,-79.467728";
    }

    public ngOnInit() { }

    public onMapClick(event: any) {
        let position = this.mapElement.getPositionAt(event.clientX, event.clientY);
        this.mapElement.highlightRegion(position);
    }


    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        let map = new H.Map(
            //this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: 37.7397, lng: -121.4252 }
            }
        );
    }

}