import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PersistenceStorage } from "../Utility/PersistenceStorage";
@Component({
  selector: "app-rforms",
  templateUrl: "./rforms.component.html",
  styleUrls: ["./rforms.component.css"],
})
export class RformsComponent implements OnInit {
  myForm: FormGroup;
  storageService: PersistenceStorage;
  formBuilder: FormBuilder;
  constructor(storageService: PersistenceStorage, formBuilder: FormBuilder) {
    this.storageService = storageService;
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
    });
    // this.myForm = new FormGroup({
    //   name: new FormControl(null),
    //   email: new FormControl(""),
    // });
  }

  onSubmit(form: FormGroup) {
    console.log("Valid?", form.valid); // true or false
    console.log("Name", form.value.name);
    console.log("Email", form.value.email);
    if (form.valid) {
      this.storageService.setValue("data", this.myForm.value);
      alert("Data Store Successfully ");
    }
  }
}
