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
import { BreakpointObserver } from "@angular/cdk/layout";

export interface Slide {
  src: string;
  link?: string;
  loaded?: boolean;
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
  @Input() slides: any[] = [
    {
      src: "https://picsum.photos/1600/900",
      link: "sample1"
    },
    {
      src: "https://picsum.photos/1920/1080",
      link: "sample2"
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

  constructor(
    @Inject(PLATFORM_ID) private platform: any,
    private breakpointObserver: BreakpointObserver
  ) {}

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
          if (this.breakpointObserver.isMatched("(min-width: 830px)")) {
            this.showZoom = true;
            this.onMouseMove(mouseEvent);
          } else {
            this.showZoom = false;
          }
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

  @HostListener("window:resize")
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

  imageLoaded(index: number) {
    this.slides[index].loaded = true;
  }

  hasLoaded(index: number): boolean {
    return this.slides[index].loaded || false;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getImage(index: number) {
    if (this.slides[index].hasOwnProperty("src")) {
      return (this.slides[index] as Slide).src;
    } else {
      return (this.slides[index] as Image).imageUrl;
    }
  }

  getCurrentImage() {
    return this.getImage(this.currentSlide);
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
