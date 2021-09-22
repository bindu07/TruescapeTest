import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { ElementRef, Injectable, NgZone, OnDestroy } from "@angular/core";
import { url } from "inspector";

@Injectable({ providedIn: "root" })
export class PreminingService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  private frameId: number = null;
  // create the scene
  //   scene = new THREE.Scene();

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public async loadmining(canvas: ElementRef<HTMLCanvasElement>) {
    // this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const loader = new GLTFLoader();
    const parrotData = await loader.loadAsync(
      "../../assets/3d-assets/Mining_Facilities.gltf"
    );

    console.log("Squaaawk!", parrotData);
    this.scene.add(parrotData.scene.children[0]);

    // const parrot = setupModel(parrotData);

    // return { parrot };
  }
  public async loadGLTF() {
    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    loader.setDRACOLoader(dracoLoader);

    // create the scene
    this.scene = new THREE.Scene();
    // this.scene.background = //#region
    this.scene.background = new THREE.Color(0xf5f5f5);

    // Load Camera Perspektive
    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    this.camera.position.set(0, 0, 4);

    // Load a Renderer
    var renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setClearColor(0xc5c5c3);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load the Orbitcontroller
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load Light
    var ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1, 1).normalize();
    this.scene.add(directionalLight);

    // Load a glTF resource
    loader.load(
      // resource URL
      "../../assets/3d-assets/Terrain_Outer.gltf",
      // called when the resource is loaded
      (gltf) => {
        console.log("Gltf", gltf);
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.x = 0; //Position (x = right+ left-)
        gltf.scene.position.y = 0; //Position (y = up+, down-)
        gltf.scene.position.z = 0; //Position (z = front +, back-)

        let object = gltf.scene.children[0];
        object.scale.set(100, 100, 100);
        object.position.set(0, 0, 0);
        this.scene.add(gltf.scene);
        this.renderer.render(this.scene, this.camera);
      },
      // called while loading is progressing
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      (error) => {
        console.log("An error happened");
      }
    );
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== "loading") {
        this.render();
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          this.render();
        });
      }

      window.addEventListener("resize", () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
