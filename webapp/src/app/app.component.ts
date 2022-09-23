import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver, LayoutModule } from "@angular/cdk/layout";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "src/services/user.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "esigi-customer";
  activeMenu!: "";
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  openTree: boolean = false;
  customer: string = "cliente";

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public translateService: TranslateService,
    private userService: UserService
  ) {
    translateService.addLangs(["en-US", "pt-BR"]);
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang("pt-BR");
    this.translateService.use("pt-BR");
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.activeMenu = res.url.split("/")[1];
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(["(max-width: 800px)"]).subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });
    }, 50);
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }

  recize() {

    this.openTree = this.openTree === true ? false : true;
  }

  openApp(port: number): void {
    location.replace(`http://localhost:${port}`);
  }

  navigator(route: any) {
    console.log("🚀 ~ file: app.component.ts ~ line 79 ~ AppComponent ~ navigator ~ route", route)
    switch (route) {
      case 'cliente':
        this.router.navigate(['cliente/lista']);
        break;
    }
  }

  logout(): void {
    this.userService.logout();
  }
}
