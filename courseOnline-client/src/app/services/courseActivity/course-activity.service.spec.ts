import { TestBed } from '@angular/core/testing';

import { CourseActivityService } from './course-activity.service';

describe('CourseActivityService', () => {
  let service: CourseActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
