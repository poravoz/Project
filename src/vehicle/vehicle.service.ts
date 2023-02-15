import { Injectable } from '@nestjs/common';
import { Vehicle } from './dto/dto';
import { VehicleExeption } from './exeption/vehicle.exeption/vehicle.exeption';

@Injectable()
export class VehicleService {
    private vehicles: Vehicle[] = [];

    public getVehicle(): Vehicle[] {
      return this.vehicles;
    }
  
    public addVehicle(content : string, status : string, number_agency:string, number_car:string): Vehicle {
      if(!content || content.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }

      if(!status || status.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }

      if(!number_agency || number_agency.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }

      if(!number_car || number_car.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }
  
      const newDto = { id: this.generateId(), content, status, number_agency, number_car};
      this.vehicles.push(newDto)
  
      return newDto;
    }
  
    public removeVehicle(id: number): void {
      const index: number = this.vehicles.findIndex(vehicle => vehicle.id === id);
      if(index === -1) {
        throw new VehicleExeption('No note found');
      }

      this.vehicles.splice(index, 1);
    }
  
    private generateId(): number {
      const currentSize = this.vehicles.length;
      if(!currentSize) {
        return 0;
      }
      return this.vehicles[currentSize - 1].id + 1;
    }

    public update(id: string, newVehicle: Vehicle): Vehicle {

      this.vehicles.forEach((vehicle, index) => {
         if(vehicle.id === +id) {
           let updatedVehicle = {
             ...this.vehicles[index],
             ...newVehicle
           }
           this.vehicles[index] = updatedVehicle;
         }
       });
      let updatedVehicle = this.vehicles.find((vehicle) => vehicle.id === +id);
      updatedVehicle.status = newVehicle.status;
      updatedVehicle.number_agency = newVehicle.number_agency;
      updatedVehicle.number_car = newVehicle.number_car;
      return updatedVehicle = this.vehicles.find((vehicle) => vehicle.id === +id);
    }
    
    getHello(): string {
      return 'Hello World!';
    }

}
