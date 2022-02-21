import { Component, OnInit } from '@angular/core';
import { PurchaseItem } from 'src/app/model/purchase-item.model';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  purchaseItemList: Array<PurchaseItem> = [];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.purchaseService.getAllPurchases().subscribe(data => {
      this.purchaseItemList = data;
    })
  }

}
