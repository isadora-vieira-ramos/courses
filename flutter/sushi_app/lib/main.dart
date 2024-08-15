import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sushi_app/models/shop.dart';
import 'package:sushi_app/pages/intro_page.dart';
import 'package:sushi_app/pages/menu_page.dart';

void main() {
  runApp(ChangeNotifierProvider(
    create: (context) => Shop(),
    child: const MyApp()
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: IntroPage(),
      routes: {
        '/intropage': (context) => const IntroPage(),
        '/menupage':(context) => const MenuPage()
      },
      debugShowCheckedModeBanner: false,
    );
  }
}


