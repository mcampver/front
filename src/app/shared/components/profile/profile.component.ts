import { Component } from '@angular/core';
// import { PermissionsService } from '../../../../_helpers/security/permissions.service';
// import { LocalstorageService } from '../../../../_helpers/services/localstorage.service';
// import { SecurityService } from '../../../../_helpers/security/security.service';
// import { CookieService } from 'ngx-cookie-service';

// import { HeaderService } from '../header.service';

@Component({
  selector: 'ai-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  accessCount = 0;
  userFullName = 'Luis Angel Llull Cespedes';
  dynamicUrl?: string;
  username = 'allull';
  menu = [
    {
      title: 'Ver perfil',
      key: 'profile',
      icon: 'person_outline',
      pack: 'eva',
    },
    {
      title: 'Cambiar contraseña',
      key: 'security',
      icon: 'lock_outline',
      pack: 'eva',
    },
    {
      title: 'Cerrar sesión',
      key: 'logout',
      icon: 'logout_outline',
      pack: 'eva',
    },
  ];

  constructor() {} // private cookie: CookieService // private headerService: HeaderService, // private securityService: SecurityService, // private localstorageService: LocalstorageService, // private permissionsService: PermissionsService,

  onInit(): void {
    // const userInfo = await this.permissionsService.getUserInfo();
    // this.userFullName = userInfo.fullName;
    // this.username = userInfo.username;
    // this.accessCount = this.localstorageService.getKey('accessCount') ?? 0;
    //this.accessCount = JSON.parse(this.cookie.get('accessCount')) ?? 0
    // this.getApiData();
  }

  /**
   * Execute the menu action
   *
   * @param key 'profile' | 'security' | 'privacity' | 'settings' | 'logout'
   */
  // menuAction(
  //   key: 'profile' | 'security' | 'privacity' | 'settings' | 'logout'
  // ) {
  //   switch (key) {
  //     case 'profile':
  //       this.securityService.goToProfile();
  //       break;
  //     case 'security':
  //       this.securityService.goToChangePassword();
  //       break;
  //     case 'logout':
  //       // this.permissionsService.logout()
  //       this.securityService.logout(this.dynamicUrl);
  //       break;
  //   }
  // }

  /**
   * Getting dinamic url
   */
  // getApiData() {
  //   this.headerService.getApiData().subscribe((values) => {
  //     this.dynamicUrl = values.items[0].dirApi;
  //   });
  // }
}
