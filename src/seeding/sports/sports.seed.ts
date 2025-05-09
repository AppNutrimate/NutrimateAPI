import { Sport } from 'src/sports/entities/sport.entity';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const sports = [
    { title: 'Football', icon: 'soccer' },
    { title: 'Basketball', icon: 'basketball' },
    { title: 'Volleyball', icon: 'volleyball' },
    { title: 'Tennis', icon: 'tennis' },
    { title: 'Running', icon: 'run-fast' },
    { title: 'Swimming', icon: 'swim' },
    { title: 'Boxing', icon: 'boxing-glove' },
    { title: 'Cycling', icon: 'bike' },
    { title: 'Golf', icon: 'golf' },
    { title: 'Judo', icon: 'karate' },
    { title: 'Baseball', icon: 'baseball' },
    { title: 'Rugby', icon: 'rugby' },
    { title: 'Cricket', icon: 'cricket' },
    { title: 'Hockey', icon: 'hockey-puck' },
    { title: 'Skateboarding', icon: 'skateboard' },
    { title: 'Climbing', icon: 'hiking' },
    { title: 'Surfing', icon: 'surfing' },
    { title: 'Fencing', icon: 'sword-cross' },
    { title: 'Weightlifting', icon: 'weight-lifter' },
    { title: 'Jiu-Jitsu', icon: 'karate' },
    { title: 'Table Tennis', icon: 'table-tennis' },
    { title: 'Beach Tennis', icon: 'sports-tennis' },
    { title: 'Roller Skating', icon: 'roller-skate' },
    { title: 'Yoga', icon: 'meditation' },
    { title: 'Pilates', icon: 'yoga' },
    { title: 'Stretching', icon: 'human-handsup' },
    { title: 'Free Workout', icon: 'dumbbell' },
    { title: 'Gym', icon: 'arm-flex' },
    { title: 'Dance', icon: 'dance-ballroom' },
    { title: 'Mixed Martial Arts', icon: 'mixed-martial-arts' },
    { title: 'Crossfit', icon: 'weight-lifter' },
    { title: 'Walking', icon: 'walk' },
    { title: 'Trekking', icon: 'hiking' },
    { title: 'Rowing', icon: 'kayak' },
    { title: 'Canoeing', icon: 'canoe' },
    { title: 'Horse Riding', icon: 'horse-variant' },
    { title: 'Ice Skating', icon: 'roller-skate' },
    { title: 'Snowboarding', icon: 'snowboard' },
    { title: 'Skiing', icon: 'ski' },
    { title: 'Archery', icon: 'bow-arrow' },
    { title: 'Scuba Diving', icon: 'scuba-tank' },
    { title: 'Parkour', icon: 'run-fast' },
    { title: 'Aerobics', icon: 'run' },
    { title: 'Zumba', icon: 'dance-ballroom' },
    { title: 'HIIT', icon: 'fire' },
    { title: 'Meditation', icon: 'meditation' },
    { title: 'Handball', icon: 'handball' },
    { title: 'Badminton', icon: 'badminton' },
];

export const seedSports = async (dataSource: DataSource) => {
    const sportRepository = dataSource.getRepository(Sport);

    for (const sport of sports) {
        const exists = await sportRepository.findOneBy({ title: sport.title });
        if (!exists) {
            const newSport = sportRepository.create({
                id: uuidv4(),
                ...sport,
            });
            await sportRepository.save(newSport);
        }
    }
};
