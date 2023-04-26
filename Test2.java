abstract class PetAnimal {
    String name;

    abstract void hungary();

    void sayHello() {
        System.out.println("This is just a hello");
    }
}

class Cat extends PetAnimal {
    // String name;

    Cat(String name) {
        this.name = name;
    }

    void hungary() {
        System.out.println(name + " want to eat a mouse.....");
    }

}

class Dog extends PetAnimal {
    // String name;

    Dog(String name) {
        this.name = name;
    }

    void hungary() {
        System.out.println(name + " want to eat a Bone.....");
    }

    void security() {
        System.out.println("I will protect you....");
    }
}

public class Test2 {
    public static void main(String[] args) {
        // ex1-------------------------------------------------------------------------------------
        PetAnimal p1 = new Cat("Kitty");
        PetAnimal p2 = new Cat("Tama");
        PetAnimal p3 = new Dog("Puppy");
        PetAnimal p4 = new Dog("Pochi");
        p1.hungary();
        p4.hungary();
        // p3.security();

        // ex2-------------------------------------------------------------------------------------
        // PetAnimal p1 = new PetAnimal();
        PetAnimal pp1 = new Dog("Doggy");
        pp1.hungary();
        Cat catArr[] = { new Cat("Kitty"), new Cat("Tama"), new Cat("Kichi") };
        Dog dogArr[] = { new Dog("Puppy"), new Dog("Pochi"), new Dog("Kuppa") };

        for (int i = 0; i < catArr.length; i++) {
            catArr[i].hungary();
        }

        for (int i = 0; i < dogArr.length; i++) {
            dogArr[i].hungary();
        }

        // ex3-------------------------------------------------------------------------------------
        PetAnimal petArr[] = { new Dog("Puppy"), new Dog("Pochi"), new Dog("Kuppa"),
                new Cat("Kitty"), new Cat("Tama"),
                new Cat("Kichi") };

        for (int i = 0; i < petArr.length; i++) {
            petArr[i].hungary();
            petArr[i].sayHello();
        }
    }
}
