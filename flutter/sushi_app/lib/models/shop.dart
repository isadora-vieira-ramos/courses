import 'package:flutter/material.dart';
import 'package:sushi_app/models/food.dart';

class Shop extends ChangeNotifier{

  final List<Food> _foodMenu = [
    Food(name: "Salmon Sushi", price: "21.00", imagePath: "lib/images/salmon_sushi.png", rating: "4.9"),
    Food(name: "Tuna", price: "23.00", imagePath: "lib/images/tuna.png", rating: "4.3"),
  ];

  List<Food> _cart = [];

  List<Food> get foodMenu => _foodMenu;
  List<Food> get cart => _cart;

  void addToCart(Food foodItem, int quantity){
    for (int i = 0; i < quantity; i++){
      _cart.add(foodItem);
    }
    notifyListeners();
  }

  void removeFromCart(Food food){
    _cart.remove(food);
    notifyListeners();
  }
}