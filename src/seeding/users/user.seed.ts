import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../users/entities/user.entity';

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(User);

    // Define users to seed
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        profilePhoto: 'john_doe.jpg',
        phone: '1234567890',
        birth: new Date().toISOString(),
        email: 'johndoe@example.com',
        password: '123456',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        profilePhoto: 'jane_smith.jpg',
        phone: '2345678901',
        birth: new Date().toISOString(),
        email: 'janesmith@example.com',
        password: '234567',
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        profilePhoto: 'mike_johnson.jpg',
        phone: '3456789012',
        birth: new Date().toISOString(),
        email: 'mikejohnson@example.com',
        password: '345678',
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        profilePhoto: 'emily_davis.jpg',
        phone: '4567890123',
        birth: new Date().toISOString(),
        email: 'emilydavis@example.com',
        password: '456789',
      },
      {
        firstName: 'David',
        lastName: 'Brown',
        profilePhoto: 'david_brown.jpg',
        phone: '5678901234',
        birth: new Date().toISOString(),
        email: 'davidbrown@example.com',
        password: '567890',
      },
      {
        firstName: 'Sarah',
        lastName: 'Wilson',
        profilePhoto: 'sarah_wilson.jpg',
        phone: '6789012345',
        birth: new Date().toISOString(),
        email: 'sarahwilson@example.com',
        password: '678901',
      },
      {
        firstName: 'James',
        lastName: 'Taylor',
        profilePhoto: 'james_taylor.jpg',
        phone: '7890123456',
        birth: new Date().toISOString(),
        email: 'jamestaylor@example.com',
        password: '789012',
      },
      {
        firstName: 'Olivia',
        lastName: 'Anderson',
        profilePhoto: 'olivia_anderson.jpg',
        phone: '8901234567',
        birth: new Date().toISOString(),
        email: 'oliviaanderson@example.com',
        password: '890123',
      },
      {
        firstName: 'Daniel',
        lastName: 'Thomas',
        profilePhoto: 'daniel_thomas.jpg',
        phone: '9012345678',
        birth: new Date().toISOString(),
        email: 'danielthomas@example.com',
        password: '901234',
      },
      {
        firstName: 'Sophia',
        lastName: 'Martinez',
        profilePhoto: 'sophia_martinez.jpg',
        phone: '1234567891',
        birth: new Date().toISOString(),
        email: 'sophiamartinez@example.com',
        password: '123457',
      },
    ];

    // Seed users into the database
    for (const userData of users) {
      const user = repository.create(userData);
      await repository.save(user);
    }
  }
}
