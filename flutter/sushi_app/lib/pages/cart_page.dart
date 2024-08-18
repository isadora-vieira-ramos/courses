import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sushi_app/components/button.dart';
import 'package:sushi_app/models/food.dart';
import 'package:sushi_app/models/shop.dart';
import 'package:sushi_app/theme/colors.dart';

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  void removeFromCart(Food food, BuildContext context) {
    final shop = context.read<Shop>();
    shop.removeFromCart(food);
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<Shop>(
      builder: (context, value, child) => Scaffold(
        backgroundColor: primaryColor,
        appBar: AppBar(
          title: Text("My Cart"),
          centerTitle: true,
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ListView.builder(
              shrinkWrap: true,
              itemCount: value.cart.length,
              itemBuilder: (context, index) {
                final Food food = value.cart[index];
                final String foodName = food.name;
                final String foodPrice = food.price;

                return Container(
                  decoration: BoxDecoration(
                    color: secondaryColor,
                    borderRadius: BorderRadius.circular(8)
                  ),
                  margin: const EdgeInsets.only(left: 20, top: 20, right: 20),
                  child: ListTile(
                    title: Text(
                      foodName, 
                      style: const TextStyle(
                        color: Colors.white, 
                        fontWeight: FontWeight.bold
                      )
                    ),
                    subtitle: Text(
                      foodPrice, 
                      style: TextStyle(color: Colors.grey[300])
                    ),
                    trailing: IconButton(
                      icon: const Icon(
                        Icons.delete, 
                        color: Colors.white
                      ), 
                      onPressed: () => removeFromCart(food, context),
                    ),
                  ),
                );
              }
            ),

            Padding(
              padding: const EdgeInsets.all(25),
              child: MyButton(text: "Pay now", onTap: () {}),
            )
          ],
        )
      )
    );
  }
}