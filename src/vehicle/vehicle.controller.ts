import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { Vehicle } from './dto/dto';
import { VehicleFilterFilter } from './filter/vehicle-filter/vehicle-filter.filter';
import { VehicleService } from './vehicle.service';


@Controller('vehicle')
@UseFilters(new VehicleFilterFilter())
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  public findAll(): Vehicle[] {
    return this.vehicleService.getVehicle();

  }

  @Post()
  public create(@Body() dto: Vehicle): Vehicle {
    return this.vehicleService.addVehicle(dto.content, dto.status, dto.number_agency, dto.number_car);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.vehicleService.removeVehicle(id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() vehicle: Vehicle): Vehicle {
    const updatedVehicle = this.vehicleService.update(id, vehicle);
    return updatedVehicle;
    
  } 

}
