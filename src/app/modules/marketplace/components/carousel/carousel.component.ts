import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from "@angular/core";
import { fromEvent, Subscription, timer } from "rxjs";
import { Image } from "../../../../../generated/graphql";
import { HostListener } from "@angular/core";

export interface Slide {
  src: string;
  link?: string;
}

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("imageContainer", {
    static: false
  })
  imageContainer: ElementRef;

  @Input() zoomable = false;
  @Input() showGalleryGrid = false;
  @Input() ratio: any = "16:9";
  @Input() slides: (Slide | Image)[] = [
    {
      src: "assets/images/house-painting.jpg",
      link: "lol"
    },
    {
      src: "assets/images/beach-wave.jpg",
      link: "wave"
    }
  ];

  zoomStyle = {
    transform: "translate(0%, 0%)"
  };

  protected imageBoundingBox: DOMRect;

  currentSlide = 0;
  protected mouseMoveSub: Subscription;

  private maxPercentage = 0;
  private minPercentage = 0;

  showZoom = false;

  constructor(@Inject(PLATFORM_ID) private platform: any) {}

  ngOnInit() {
    this.slides = this.slides.map(slide => {
      if ("src" in slide) {
        return slide;
      } else {
        return {
          src: slide.imageUrl
        };
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.initZoom();
      if (this.zoomable) {
        this.mouseMoveSub = fromEvent<MouseEvent>(
          this.imageContainer.nativeElement,
          "mousemove"
        ).subscribe(mouseEvent => {
          this.showZoom = true;
          this.onMouseMove(mouseEvent);
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.mouseMoveSub && !this.mouseMoveSub.closed) {
      this.mouseMoveSub.unsubscribe();
    }
  }

  initZoom() {
    const widthRatio = this.ratio.split(":")[0];
    const heightRatio = this.ratio.split(":")[1];

    this.maxPercentage = (Number(widthRatio) / Number(heightRatio)) * 100;
    this.minPercentage = 100 - this.maxPercentage;

    this.zoomStyle = {
      transform: `translate(-${this.minPercentage}%, -${this.minPercentage}%)`
    };

    this.imageBoundingBox = this.imageContainer.nativeElement.getBoundingClientRect();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (isPlatformBrowser(this.platform)) {
      timer(500).subscribe(() => this.initZoom());
    }
  }

  goToLink(slide: Slide) {
    if (slide.link) {
      console.log(slide.link);
    }
  }

  next() {
    if (this.slides.length - 1 === this.currentSlide) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
  }

  prev() {
    if (0 === this.currentSlide) {
      this.currentSlide = this.slides.length - 1;
    } else {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getCurrentImage() {
    if (this.slides[this.currentSlide].hasOwnProperty("src")) {
      return (this.slides[this.currentSlide] as Slide).src;
    } else {
      return (this.slides[this.currentSlide] as Image).imageUrl;
    }
  }

  onMouseMove(event: MouseEvent) {
    const bounds = this.imageBoundingBox;
    const posX = Math.max(
      Math.min(
        ((event.clientX - bounds.x) / bounds.width) * 100,
        this.maxPercentage
      ),
      this.minPercentage
    );
    const posY = Math.max(
      Math.min(
        ((event.clientY - bounds.y) / bounds.height) * 100,
        this.maxPercentage
      ),
      this.minPercentage
    );

    this.zoomStyle = {
      transform: `translateX(-${posX}%) translateY(-${posY}%)`
    };
  }
}
