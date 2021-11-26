import { Component, ViewEncapsulation, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import Cropper from 'cropperjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["image"];
function CropperComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "div", 7);
    i0.ɵɵelementEnd();
} }
function CropperComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.loadImageErrorText);
} }
export class CropperComponent {
    constructor() {
        this.cropperOptions = {};
        this.export = new EventEmitter();
        this.ready = new EventEmitter();
        this.isLoading = true;
    }
    ngOnInit() {
    }
    /**
     * Image loaded
     * @param ev
     */
    imageLoaded(ev) {
        //
        // Unset load error state
        this.loadError = false;
        //
        // Setup image element
        const image = ev.target;
        this.imageElement = image;
        //
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin)
            image.crossOrigin = 'anonymous';
        //
        // Image on ready event
        image.addEventListener('ready', () => {
            //
            // Emit ready
            this.ready.emit(true);
            //
            // Unset loading state
            this.isLoading = false;
            //
            // Validate cropbox existance
            if (this.cropbox) {
                //
                // Set cropbox data
                this.cropper.setCropBoxData(this.cropbox);
            }
        });
        //
        // Setup aspect ratio according to settings
        let aspectRatio = NaN;
        if (this.settings) {
            const { width, height } = this.settings;
            aspectRatio = width / height;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);
        //
        // Set cropperjs
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = undefined;
        }
        this.cropper = new Cropper(image, this.cropperOptions);
    }
    /**
     * Image load error
     * @param event
     */
    imageLoadError(event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    }
    /**
     * Export canvas
     * @param base64
     */
    exportCanvas(base64) {
        //
        // Get and set image, crop and canvas data
        const imageData = this.cropper.getImageData();
        const cropData = this.cropper.getCropBoxData();
        const canvas = this.cropper.getCroppedCanvas();
        const data = { imageData, cropData };
        //
        // Create promise to resolve canvas data
        const promise = new Promise(resolve => {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(blob => resolve({ blob }));
        });
        //
        // Emit export data when promise is ready
        promise.then(res => {
            this.export.emit(Object.assign(data, res));
        });
    }
}
/** @nocollapse */ CropperComponent.ɵfac = function CropperComponent_Factory(t) { return new (t || CropperComponent)(); };
/** @nocollapse */ CropperComponent.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: CropperComponent, selectors: [["angular-cropper"]], viewQuery: function CropperComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.image = _t.first);
    } }, inputs: { imageUrl: "imageUrl", settings: "settings", cropbox: "cropbox", loadImageErrorText: "loadImageErrorText", cropperOptions: "cropperOptions" }, outputs: { export: "export", ready: "ready" }, decls: 6, vars: 3, consts: [[1, "cropper-wrapper"], ["class", "loading-block", 4, "ngIf"], ["class", "alert alert-warning", 4, "ngIf"], [1, "cropper"], ["alt", "image", 3, "src", "load", "error"], ["image", ""], [1, "loading-block"], [1, "spinner"], [1, "alert", "alert-warning"]], template: function CropperComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, CropperComponent_div_1_Template, 2, 0, "div", 1);
        i0.ɵɵtemplate(2, CropperComponent_div_2_Template, 2, 1, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "img", 4, 5);
        i0.ɵɵlistener("load", function CropperComponent_Template_img_load_4_listener($event) { return ctx.imageLoaded($event); })("error", function CropperComponent_Template_img_error_4_listener($event) { return ctx.imageLoadError($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.loadError);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("src", ctx.imageUrl, i0.ɵɵsanitizeUrl);
    } }, directives: [i1.NgIf], styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CropperComponent, [{
        type: Component,
        args: [{
                selector: 'angular-cropper',
                templateUrl: './cropper.component.html',
                styleUrls: ['./cropper.component.css'],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return []; }, { image: [{
            type: ViewChild,
            args: ['image']
        }], imageUrl: [{
            type: Input
        }], settings: [{
            type: Input
        }], cropbox: [{
            type: Input
        }], loadImageErrorText: [{
            type: Input
        }], cropperOptions: [{
            type: Input
        }], export: [{
            type: Output
        }], ready: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDOzs7OztJQ0c1Qiw4QkFBNkM7SUFDekMseUJBQTJCO0lBQy9CLGlCQUFNOzs7SUFHTiw4QkFBbUQ7SUFBQSxZQUF3QjtJQUFBLGlCQUFNOzs7SUFBOUIsZUFBd0I7SUFBeEIsK0NBQXdCOztBRFkvRSxNQUFNLE9BQU8sZ0JBQWdCO0lBa0J6QjtRQVZTLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRXhCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUNoRCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixjQUFTLEdBQVksSUFBSSxDQUFDO0lBS2pCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsRUFBUztRQUVqQixFQUFFO1FBQ0YseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLEVBQUU7UUFDRixzQkFBc0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQTBCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsRUFBRTtRQUNGLG1CQUFtQjtRQUNuQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCO1lBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFMUUsRUFBRTtRQUNGLHVCQUF1QjtRQUN2QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNqQyxFQUFFO1lBQ0YsYUFBYTtZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRCLEVBQUU7WUFDRixzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdkIsRUFBRTtZQUNGLDZCQUE2QjtZQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBRWQsRUFBRTtnQkFDRixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRTtRQUNGLDJDQUEyQztRQUMzQyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3hDLFdBQVcsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ2hDO1FBRUQsRUFBRTtRQUNGLG1CQUFtQjtRQUNuQixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hDLFdBQVc7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsQ0FBQztZQUNYLGdCQUFnQixFQUFFLElBQUk7U0FDekIsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEIsRUFBRTtRQUNGLGdCQUFnQjtRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7O09BR0c7SUFDSCxjQUFjLENBQUMsS0FBVTtRQUVyQixFQUFFO1FBQ0YsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLEVBQUU7UUFDRixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxNQUFZO1FBRXJCLEVBQUU7UUFDRiwwQ0FBMEM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQyxNQUFNLElBQUksR0FBRyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUVyQyxFQUFFO1FBQ0Ysd0NBQXdDO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBRWxDLEVBQUU7WUFDRixrQkFBa0I7WUFDbEIsSUFBSSxNQUFNLEVBQUU7Z0JBRVIsRUFBRTtnQkFDRiwrQkFBK0I7Z0JBQy9CLE9BQU8sT0FBTyxDQUFDO29CQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztpQkFDekMsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRTtRQUNGLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O21HQTlJUSxnQkFBZ0I7a0dBQWhCLGdCQUFnQjs7Ozs7O1FDcEI3Qiw4QkFBNkI7UUFHekIsaUVBRU07UUFHTixpRUFBaUY7UUFHakYsOEJBQXFCO1FBQ2pCLGlDQUF5RztRQUFoRSw4RkFBUSx1QkFBbUIsSUFBQyxtRkFBVSwwQkFBc0IsSUFBaEM7UUFBckUsaUJBQXlHO1FBQzdHLGlCQUFNO1FBQ1YsaUJBQU07O1FBWDBCLGVBQWU7UUFBZixvQ0FBZTtRQUtULGVBQWU7UUFBZixvQ0FBZTtRQUlyQixlQUFnQjtRQUFoQixvREFBZ0I7O3VGRFFuQyxnQkFBZ0I7Y0FONUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSwwQkFBMEI7Z0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2dCQUN0QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4QztzQ0FHdUIsS0FBSztrQkFBeEIsU0FBUzttQkFBQyxPQUFPO1lBRVQsUUFBUTtrQkFBaEIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxrQkFBa0I7a0JBQTFCLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBRUksTUFBTTtrQkFBZixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENyb3BwZXIgZnJvbSAnY3JvcHBlcmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUNyb3BwZXJTZXR0aW5nIHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlclJlc3VsdCB7XG4gICAgaW1hZ2VEYXRhOiBDcm9wcGVyLkltYWdlRGF0YTtcbiAgICBjcm9wRGF0YTogQ3JvcHBlci5Dcm9wQm94RGF0YTtcbiAgICBibG9iPzogQmxvYjtcbiAgICBkYXRhVXJsPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FuZ3VsYXItY3JvcHBlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nyb3BwZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Nyb3BwZXIuY29tcG9uZW50LmNzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ3JvcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdpbWFnZScpIGltYWdlOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgaW1hZ2VVcmw6IGFueTtcbiAgICBASW5wdXQoKSBzZXR0aW5nczogSW1hZ2VDcm9wcGVyU2V0dGluZztcbiAgICBASW5wdXQoKSBjcm9wYm94OiBDcm9wcGVyLkNyb3BCb3hEYXRhO1xuICAgIEBJbnB1dCgpIGxvYWRJbWFnZUVycm9yVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNyb3BwZXJPcHRpb25zOiBhbnkgPSB7fTtcblxuICAgIEBPdXRwdXQoKSBleHBvcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlQ3JvcHBlclJlc3VsdD4oKTtcbiAgICBAT3V0cHV0KCkgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3JvcHBlcjogQ3JvcHBlcjtcbiAgICBwdWJsaWMgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHB1YmxpYyBsb2FkRXJyb3I6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbWFnZSBsb2FkZWRcbiAgICAgKiBAcGFyYW0gZXZcbiAgICAgKi9cbiAgICBpbWFnZUxvYWRlZChldjogRXZlbnQpIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBVbnNldCBsb2FkIGVycm9yIHN0YXRlXG4gICAgICAgIHRoaXMubG9hZEVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2UgZWxlbWVudFxuICAgICAgICBjb25zdCBpbWFnZSA9IGV2LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICB0aGlzLmltYWdlRWxlbWVudCA9IGltYWdlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEFkZCBjcm9zc09yaWdpbj9cbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlck9wdGlvbnMuY2hlY2tDcm9zc09yaWdpbikgaW1hZ2UuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcblxuICAgICAgICAvL1xuICAgICAgICAvLyBJbWFnZSBvbiByZWFkeSBldmVudFxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdyZWFkeScsICgpID0+IHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBFbWl0IHJlYWR5XG4gICAgICAgICAgICB0aGlzLnJlYWR5LmVtaXQodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBVbnNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVmFsaWRhdGUgY3JvcGJveCBleGlzdGFuY2VcbiAgICAgICAgICAgIGlmICh0aGlzLmNyb3Bib3gpIHtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gU2V0IGNyb3Bib3ggZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci5zZXRDcm9wQm94RGF0YSh0aGlzLmNyb3Bib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBhc3BlY3QgcmF0aW8gYWNjb3JkaW5nIHRvIHNldHRpbmdzXG4gICAgICAgIGxldCBhc3BlY3RSYXRpbyA9IE5hTjtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zZXR0aW5ncztcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgY3JvcCBvcHRpb25zXG4gICAgICAgIC8vIGV4dGVuZCBkZWZhdWx0IHdpdGggY3VzdG9tIGNvbmZpZ1xuICAgICAgICB0aGlzLmNyb3BwZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBhc3BlY3RSYXRpbyxcbiAgICAgICAgICAgIG1vdmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgem9vbWFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld01vZGU6IDEsXG4gICAgICAgICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlXG4gICAgICAgIH0sIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjcm9wcGVyanNcbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlcikge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyb3BwZXIgPSBuZXcgQ3JvcHBlcihpbWFnZSwgdGhpcy5jcm9wcGVyT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1hZ2UgbG9hZCBlcnJvclxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIGltYWdlTG9hZEVycm9yKGV2ZW50OiBhbnkpIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgbG9hZCBlcnJvciBzdGF0ZVxuICAgICAgICB0aGlzLmxvYWRFcnJvciA9IHRydWU7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cG9ydCBjYW52YXNcbiAgICAgKiBAcGFyYW0gYmFzZTY0XG4gICAgICovXG4gICAgZXhwb3J0Q2FudmFzKGJhc2U2ND86IGFueSkge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEdldCBhbmQgc2V0IGltYWdlLCBjcm9wIGFuZCBjYW52YXMgZGF0YVxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmNyb3BwZXIuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNyb3BEYXRhID0gdGhpcy5jcm9wcGVyLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGltYWdlRGF0YSwgY3JvcERhdGEgfTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBDcmVhdGUgcHJvbWlzZSB0byByZXNvbHZlIGNhbnZhcyBkYXRhXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGJhc2U2NFxuICAgICAgICAgICAgaWYgKGJhc2U2NCkge1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHByb21pc2Ugd2l0aCBkYXRhVXJsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHJlc29sdmUoeyBibG9iIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRW1pdCBleHBvcnQgZGF0YSB3aGVuIHByb21pc2UgaXMgcmVhZHlcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cG9ydC5lbWl0KE9iamVjdC5hc3NpZ24oZGF0YSwgcmVzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIjwhLS0gQ1JPUFBFUiBXUkFQUEVSIC0tPlxuPGRpdiBjbGFzcz1cImNyb3BwZXItd3JhcHBlclwiPlxuXG4gICAgPCEtLSBMT0FESU5HIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJsb2NrXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTE9BRCBFUlJPUiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiICpuZ0lmPVwibG9hZEVycm9yXCI+e3sgbG9hZEltYWdlRXJyb3JUZXh0IH19PC9kaXY+XG5cbiAgICA8IS0tIENST1BQRVIgLS0+XG4gICAgPGRpdiBjbGFzcz1cImNyb3BwZXJcIj5cbiAgICAgICAgPGltZyAjaW1hZ2UgYWx0PVwiaW1hZ2VcIiBbc3JjXT1cImltYWdlVXJsXCIgKGxvYWQpPVwiaW1hZ2VMb2FkZWQoJGV2ZW50KVwiIChlcnJvcik9XCJpbWFnZUxvYWRFcnJvcigkZXZlbnQpXCIgLz5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19