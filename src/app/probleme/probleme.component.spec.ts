import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], //Ajouté
      declarations: [ProblemeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it(' Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it(' Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTrue();
  });

  it(' Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTrue();
  });

  it(' Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(null);
    errors = zone.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });

  it(' Zone PRÉNOM valide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));

    //Préparer une variable pour manipuler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    //Faire l'appel du validateur
    let result = validator(zone as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat prévu
    expect(result['plageInvalide']).toBe(true);
  });

  it(' Zone PRÉNOM valide avec 2 espaces et 1 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a');

    //Préparer une variable pour manipuler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    //Faire l'appel du validateur
    let result = validator(zone as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat prévu
    expect(result['plageInvalide']).toBe(true);
  });
});
