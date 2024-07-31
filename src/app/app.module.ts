import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    TaskComponent,
    ProjectComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatIconModule,
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
