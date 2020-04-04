import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { FormModule } from "./form/form.module"
import { HttpClientModule } from "@angular/common/http"
import { ExamplesModule } from "./examples/examples.module"
import { CommonModule } from "@angular/common"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormModule,
    HttpClientModule,
    ExamplesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
